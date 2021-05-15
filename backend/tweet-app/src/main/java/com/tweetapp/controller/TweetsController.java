package com.tweetapp.controller;

import java.util.List;

import javax.validation.Valid;

import com.tweetapp.exception.NotFoundException;
import com.tweetapp.exception.UnauthorisedUserAccessException;
import com.tweetapp.model.SimpleRequest;
import com.tweetapp.model.Tweet;
import com.tweetapp.service.TweetsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1.0/tweets/")
@Slf4j
public class TweetsController {

    @Autowired
    private TweetsService tweetsService;

    @PostMapping(value = "/{username}/add")
    public ResponseEntity<Tweet> postNewTweet(@PathVariable String username, @Valid @RequestBody SimpleRequest request)
            throws NotFoundException, UnauthorisedUserAccessException {

        log.info("Recieved request to post new tweet.");
        return new ResponseEntity<>(tweetsService.addTweet(username, request.getValue()), HttpStatus.CREATED);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Tweet>> getAllTweets() {

        log.info("Recieved request to get all tweets.");
        List<Tweet> tweets = tweetsService.getAllTweets();
        log.info("Found {} tweets.", tweets.size());
        return new ResponseEntity<>(tweets, HttpStatus.OK);
    }

    @GetMapping(value = "/{username}/all")
    public ResponseEntity<List<Tweet>> getAllTweetsByUser(@PathVariable String username) throws NotFoundException {

        log.info("Recieved request to get all tweets.");
        List<Tweet> tweets = tweetsService.getAllTweetsByUsername(username);
        log.info("Found {} tweets.", tweets.size());
        return new ResponseEntity<>(tweets, HttpStatus.OK);
    }

    @PatchMapping(value = "/{username}/update/{tweetId}")
    public ResponseEntity<Tweet> getAllTweetsByUser(@PathVariable String username, @PathVariable String tweetId,
            @RequestBody SimpleRequest request) throws UnauthorisedUserAccessException, NotFoundException {

        log.info("Recieved request to update tweet {}.", tweetId);
        Tweet tweet = tweetsService.updateTweet(username, request.getValue(), tweetId);
        log.info("Tweet updated.");
        return new ResponseEntity<>(tweet, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{username}/delete/{tweetId}")
    public ResponseEntity<HttpStatus> deleteTweet(@PathVariable String username, @PathVariable String tweetId)
            throws UnauthorisedUserAccessException, NotFoundException {

        log.info("Recieved request to delete tweet {}.", tweetId);
        boolean isDeleted = tweetsService.deleteTweet(username, tweetId);
        if (isDeleted) {
            log.info("Tweet deleted.");
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping(value = "/{username}/like/{tweetId}")
    public ResponseEntity<HttpStatus> likeTweet(@PathVariable String username, @PathVariable String tweetId)
            throws UnauthorisedUserAccessException, NotFoundException {

        log.info("Recieved request to like tweet {}.", tweetId);
        tweetsService.toggleLike(username, tweetId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/{username}/reply/{tweetId}")
    public ResponseEntity<Tweet> commentOnTweet(@PathVariable String username, @PathVariable String tweetId,
            @RequestBody SimpleRequest request) throws UnauthorisedUserAccessException, NotFoundException {

        log.info("Recieved request to comment on tweet {}.", tweetId);
        Tweet updatedTweet = tweetsService.addComment(username, tweetId, request.getValue());
        return new ResponseEntity<>(updatedTweet, HttpStatus.OK);
    }

}
