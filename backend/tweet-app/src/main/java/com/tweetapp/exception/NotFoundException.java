package com.tweetapp.exception;

/**
 * When the requested entity is not found in DB
 */
public class NotFoundException extends Exception {

    public static final String USER_NOT_FOUND = "The requested user is not found";
    public static final String TWEET_NOT_FOUND = "The requested tweet is not found";

    public NotFoundException(String message) {
        super(message);
    }
}
