package com.tweetapp.exception;

public class UnauthorisedUserAccessException extends Exception{
    public UnauthorisedUserAccessException() {
        super("The current logged in user is not allowed to change/post for other users.");
    }
}
