package com.tweetapp.exception;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerAdviceExceptionHandler extends ResponseEntityExceptionHandler {

    // Handle the entity not found exceptions, returns 404
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleNotFoundException(NotFoundException ex, WebRequest request) {

        HttpStatus status = HttpStatus.NOT_FOUND;
        ExceptionResponse response = formExceptionResponse(ex, status);
        return new ResponseEntity<>(response, status);
    }

    // Handle the exception that is thrown when duplicate email and username are
    // enetred, rerturns 400
    @ExceptionHandler(FieldValueAlreadyInUseException.class)
    public ResponseEntity<ExceptionResponse> handleFieldValueAlreadyInUseException(FieldValueAlreadyInUseException ex,
            WebRequest request) {

        HttpStatus status = HttpStatus.BAD_REQUEST;
        ExceptionResponse response = formExceptionResponse(ex, status);
        return new ResponseEntity<>(response, status);
    }

    // When a user tries to add/update/delete/like tweets using someone elses url,
    // then this exception is thrown, return 403
    @ExceptionHandler(UnauthorisedUserAccessException.class)
    public ResponseEntity<ExceptionResponse> handleUnauthorisedUserAccessException(UnauthorisedUserAccessException ex,
            WebRequest request) {

        HttpStatus status = HttpStatus.UNAUTHORIZED;
        ExceptionResponse response = formExceptionResponse(ex, status);
        return new ResponseEntity<>(response, status);
    }

    // When the request body validation fails
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {

        ExceptionResponse response = new ExceptionResponse();
        response.setTimestamp(ZonedDateTime.now(ZoneId.of("UTC")));
        response.setStatus(status.value());
        response.setError(ex.getClass().getSimpleName());

        List<String> errorMsgs = ex.getBindingResult().getFieldErrors().stream()
                .map(x -> x.getField() + " : " + x.getDefaultMessage()).collect(Collectors.toList());

        response.setMessage(errorMsgs.stream().collect(Collectors.joining(", ")));

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {

        ExceptionResponse response = formExceptionResponse(ex, status);
        return new ResponseEntity<>(response, status);
    }

    /**
     * Returns the app wide standard exception response
     * 
     * @param ex     - Excpetion thrown
     * @param status - Return <code>HttpStatus</code>
     * @return Returns <code> ExceptionResponse</code>
     */
    private ExceptionResponse formExceptionResponse(Exception ex, HttpStatus status) {
        ExceptionResponse response = new ExceptionResponse();
        response.setTimestamp(ZonedDateTime.now(ZoneId.of("UTC")));
        response.setStatus(status.value());
        response.setError(ex.getClass().getSimpleName());
        response.setMessage(ex.getMessage());
        return response;
    }
}
