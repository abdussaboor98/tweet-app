package com.tweetapp.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {

    private String id;

    private String username;

    private String firstName;

    private String message;

    private LocalDateTime createdDateTime;

}