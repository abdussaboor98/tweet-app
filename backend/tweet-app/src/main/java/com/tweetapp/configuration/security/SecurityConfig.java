package com.tweetapp.configuration.security;

import java.util.List;

import com.tweetapp.constant.AppConstants;
import com.tweetapp.constant.AuthConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService usersService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${cors.allowed-origins}")
    private List<String> corsAllowedOrigin;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(AppConstants.API_URL_PREFIX + AuthConstants.AUTH_LOGIN_ENDPOINT).permitAll()
                .antMatchers(AppConstants.API_URL_PREFIX + "/register").permitAll()
                .antMatchers(AppConstants.API_URL_PREFIX + "/**/forgot").permitAll().antMatchers("/ws/**").permitAll()
                .antMatchers("/swagger-ui/*").permitAll().antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/v2/api-docs").permitAll().antMatchers("/webjars/**").permitAll().anyRequest()
                .authenticated().and().addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager())).sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usersService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true);
        corsConfig.setAllowedOrigins(corsAllowedOrigin);
        corsConfig.addAllowedHeader("*");
        corsConfig.addAllowedMethod(HttpMethod.GET);
        corsConfig.addAllowedMethod(HttpMethod.POST);
        corsConfig.addAllowedMethod(HttpMethod.PUT);
        corsConfig.addAllowedMethod(HttpMethod.PATCH);
        corsConfig.addAllowedMethod(HttpMethod.DELETE);
        source.registerCorsConfiguration("/**", corsConfig);
        return new CorsFilter(source);
    }
}
