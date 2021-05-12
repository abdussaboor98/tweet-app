package com.tweetapp.constant;

public class AuthConstants {
    public static final String AUTH_LOGIN_ENDPOINT = "/login";
    public static final String JWT_SECRET = "sUpErSecReTtWEeTApP";
    public static final long JWT_EXPIRATION_TIME = 900000;
    public static final String AUTH_TOKEN_PREFIX = "Bearer ";
    public static final String AUTH_HEADER_STRING = "Authorization";

    private AuthConstants() {}
}
