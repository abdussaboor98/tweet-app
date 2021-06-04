package com.tweetapp.configuration;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableDynamoDBRepositories(basePackages = "com.tweetapp.repo")
public class DynamoDBConfig {

    @Bean
    public AmazonDynamoDB amazonDynamoDB() {
        // This gets the default config from cofig and credentials files creted under
        // Windows: C:/Users/<YOUR USERNAME>/.aws
        // Linux: <your home directory>/.aws
        return AmazonDynamoDBClientBuilder.standard().build();
    }
}
