package com.tweetapp.model;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    private String id;
    
    private String username;

    private String message;

    private ZonedDateTime createdDateTime;

}