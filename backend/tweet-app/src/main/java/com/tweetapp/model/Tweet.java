package com.tweetapp.model;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tweet {

    private String id;

    @NotBlank
    private String message;

    @NotBlank
    private String username;

    private String firstName;

    private Set<String> likedUsernames;

    private List<Comment> comments;

    @DateTimeFormat(iso = ISO.DATE_TIME)
    private ZonedDateTime createdDateTime;

    private boolean edited;
}
