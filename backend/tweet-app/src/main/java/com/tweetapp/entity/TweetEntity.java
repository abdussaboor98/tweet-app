package com.tweetapp.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tweets")
public class TweetEntity {
    @Id
    private String id;

    private String message;

    private String username;

    private String firstName;

    private Set<String> likedUsernames;

    private List<CommentEntity> comments;

    private LocalDateTime createdDateTime;

    private boolean edited;
}
