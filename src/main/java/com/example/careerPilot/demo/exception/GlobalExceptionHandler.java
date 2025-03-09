package com.example.careerPilot.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;
import java.time.LocalDateTime;

@RestControllerAdvice
//@ExceptionHandler(AuthenticationException.class)
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class) // Use your custom exception
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now() ,"Resource Not Found",  ex.getMessage() , HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(errorResponse , HttpStatus.NOT_FOUND);
    }
}