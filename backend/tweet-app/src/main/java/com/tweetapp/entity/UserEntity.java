package com.tweetapp.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class UserEntity {
    @Id
    private String id;

    @Indexed(name = "user_email", unique = true)
    private String email;

    @Indexed(name = "user_username", unique = true)
    private String username;

    private String password;

    private String firstName;

    private String lastName;
    
    private String phoneNo;
}