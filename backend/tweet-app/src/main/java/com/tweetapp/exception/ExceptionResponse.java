package com.tweetapp.exception;

import java.time.ZonedDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExceptionResponse {
    private ZonedDateTime timestamp;
    private int status;
    private String error;
    private String message;
}
