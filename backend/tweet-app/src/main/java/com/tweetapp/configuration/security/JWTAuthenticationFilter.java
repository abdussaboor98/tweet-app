package com.tweetapp.configuration.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tweetapp.constant.AppConstants;
import com.tweetapp.constant.AuthConstants;
import com.tweetapp.model.UserAuthRequest;
import com.tweetapp.model.UserAuthResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl(AppConstants.API_URL_PREFIX + AuthConstants.AUTH_LOGIN_ENDPOINT);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException {
        try {
            UserAuthRequest creds = new ObjectMapper().readValue(req.getInputStream(), UserAuthRequest.class);

            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(),
                    creds.getPassword(), new ArrayList<>()));
        } catch (IOException e) {
            throw new AuthenticationServiceException("Unable to read auth request.", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
            Authentication auth) throws IOException {
        String token = JWT.create().withSubject(((User) auth.getPrincipal()).getUsername())
                // .withExpiresAt(new Date(System.currentTimeMillis() + AuthConstants.JWT_EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(AuthConstants.JWT_SECRET.getBytes()));

        UserAuthResponse authResponse = new UserAuthResponse();
        authResponse.setUsername(((User) auth.getPrincipal()).getUsername());
        authResponse.setToken(token);
        String body = new ObjectMapper().writeValueAsString(authResponse);

        res.setContentType("application/json");
        res.getWriter().write(body);
        res.getWriter().flush();
    }
}
