package com.tweetapp.exception;

/**
 * When a User tries to change the data of another user
 */
public class UnauthorisedUserAccessException extends Exception {
    public UnauthorisedUserAccessException() {
        super("The current logged in user is not allowed to change/post for other users.");
    }
}
