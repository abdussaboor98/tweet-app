package com.tweetapp.exception;

/**
 * When dulicate values are not allowed for a field in the entity
 */
public class FieldValueAlreadyInUseException extends Exception {

    public static final String USERNAME_ALREADY_IN_USE = "The requested username is already in use.";
    public static final String EMAIL_ALREADY_IN_USE = "The requested email is already in use.";

    public FieldValueAlreadyInUseException(String message) {
        super(message);
    }
}
