package com.tweetapp.entity;

import java.time.LocalDateTime;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.tweetapp.configuration.converter.LocalDateTimeDynamoDBConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@DynamoDBDocument
public class CommentEntity {

    @DynamoDBAttribute
    private String id;

    @DynamoDBAttribute
    private String username;

    @DynamoDBAttribute
    private String firstName;

    @DynamoDBAttribute
    private String message;

    @DynamoDBTypeConverted(converter = LocalDateTimeDynamoDBConverter.class)
    private LocalDateTime createdDateTime;

}