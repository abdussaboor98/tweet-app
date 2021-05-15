package com.tweetapp.configuration.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.tweetapp.constant.AuthConstants;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        String header = req.getHeader(AuthConstants.AUTH_HEADER_STRING);
        System.out.println(header);

        if (header != null && header.startsWith(AuthConstants.AUTH_TOKEN_PREFIX)) {
            UsernamePasswordAuthenticationToken authentication = null;
            String user = JWT.require(Algorithm.HMAC512(AuthConstants.JWT_SECRET.getBytes())).build()
                    .verify(header.replace(AuthConstants.AUTH_TOKEN_PREFIX, "")).getSubject();

            if (user != null) {
                authentication = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            }

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(req, res);
    }
}
