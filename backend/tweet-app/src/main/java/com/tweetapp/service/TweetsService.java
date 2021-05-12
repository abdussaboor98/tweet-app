package com.tweetapp.service;

import java.util.List;

import com.tweetapp.exception.NotFoundException;
import com.tweetapp.exception.UnauthorisedUserAccessException;
import com.tweetapp.model.Tweet;

public interface TweetsService {
    
    public Tweet addTweet(String username, String tweetMessage) throws NotFoundException, UnauthorisedUserAccessException;

    public List<Tweet> getAllTweets();

    public List<Tweet> getAllTweetsByUsername(String username) throws NotFoundException;

    public boolean deleteTweet(String username, String tweetId) throws NotFoundException, UnauthorisedUserAccessException;

    public Tweet updateTweet(String username, String tweetMessage, String tweetId) throws NotFoundException, UnauthorisedUserAccessException;

    public void toggleLike(String username, String tweetId) throws NotFoundException, UnauthorisedUserAccessException;

    public Tweet addComment(String username, String tweetId, String commentMessage) throws NotFoundException, UnauthorisedUserAccessException;
}
