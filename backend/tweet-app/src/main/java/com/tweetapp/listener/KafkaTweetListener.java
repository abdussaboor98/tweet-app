package com.tweetapp.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tweetapp.constant.AppConstants;
import com.tweetapp.model.Tweet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class KafkaTweetListener {

    @Autowired
    private SimpMessagingTemplate simptemplate;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Listens for the tweets Kafka topic and send the message to WebSocket
     * 
     * @param tweetString - Tweet read from Kafka topic
     */
    @KafkaListener(topics = AppConstants.KAFKA_TOPIC, groupId = AppConstants.KAFKA_CONSUMER_GROUP_ID)
    public void listenTweets(String tweetString) {
        log.info("Received new tweet: {}" + tweetString);
        try {
            simptemplate.convertAndSend("/ws/tweets", objectMapper.readValue(tweetString, Tweet.class));
        } catch (MessagingException | JsonProcessingException e) {
            log.error("Exception in sending message to websocket: {}", e.getMessage());
        }
    }
}
