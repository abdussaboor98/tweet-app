package com.tweetapp.constant;

public class AppConstants {

    public static final String EMAIL_VALIDATION_REGEX_PATTERN = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+_.-]+[.]+[a-zA-Z]{2,7}$";
    public static final String API_URL_PREFIX = "/api/v1.0/tweets";

    public static final String KAFKA_TOPIC = "tweet-app";
    public static final String KAFKA_CONSUMER_GROUP_ID = "tweet";

    private AppConstants() {

    }
}
