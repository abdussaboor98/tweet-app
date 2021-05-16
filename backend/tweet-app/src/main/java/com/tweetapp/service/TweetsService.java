package com.tweetapp.service;

import java.util.List;

import com.tweetapp.exception.NotFoundException;
import com.tweetapp.exception.UnauthorisedUserAccessException;
import com.tweetapp.model.Tweet;

public interface TweetsService {
    /**
     * Create and saves new {@link Tweet} post. It also writes the {@link Tweet} to
     * the Kafka topic
     * 
     * @param username     - The username of the user posting the {@link Tweet}
     * @param tweetMessage - The message of the {@link Tweet}
     * @return The new {@link Tweet} saved.
     * @throws NotFoundException               If the {@link User} is not found
     * @throws UnauthorisedUserAccessException If the requesting {@link User} and
     *                                         Auth {@link User} do not match
     */
    public Tweet addTweet(String username, String tweetMessage)
            throws NotFoundException, UnauthorisedUserAccessException;

    /**
     * Get all tweets saved.
     * 
     * @return List of all {@link Tweet}s
     */
    public List<Tweet> getAllTweets();

    /**
     * Get all {@link Tweet}s by a specific user, based on username
     * 
     * @param username - The username of the {@code User} whose {@link Tweet}s are
     *                 to be fetched.
     * @return List of all {@link Tweet}s by the {@code User}
     * @throws NotFoundException If the {@code User} is not found.
     */
    public List<Tweet> getAllTweetsByUsername(String username) throws NotFoundException;

    /**
     * Delete the tweet
     * 
     * @param username - the username whose tweet is to be deleted
     * @param tweetId  - The id of the tweet to be deleted
     * @return {@code true} if the tweet was deleted otherwise {@code false}
     * @throws NotFoundException               If the {@code Tweet} is not found.
     * @throws UnauthorisedUserAccessException If the requesting {@code User} and
     *                                         Auth {@code User} do not match
     */
    public boolean deleteTweet(String username, String tweetId)
            throws NotFoundException, UnauthorisedUserAccessException;

    /**
     * Update the message of the tweet
     * 
     * @param username     - The username of the User who's {@link Tweet} is to be
     *                     updated
     * @param tweetMessage - The updated {@link Tweet} message.
     * @param tweetId      - The {@link Tweet} id.
     * @return The updated {@link Tweet}
     * @throws NotFoundException               If the {@link Tweet} or User is not
     *                                         found.
     * @throws UnauthorisedUserAccessException If the requesting {@link User} and
     *                                         Auth {@link User} do not match
     */
    public Tweet updateTweet(String username, String tweetMessage, String tweetId)
            throws NotFoundException, UnauthorisedUserAccessException;

    /**
     * Toggle like on the Tweet for the corresponding user.
     * 
     * @param username - The username of the user who is toggling the like.
     * @param tweetId  - The Tweet id for which the like is to be toggeled for.
     * @throws NotFoundException               If the User or Tweet is not found.
     * @throws UnauthorisedUserAccessException If the requesting {@link User} and
     *                                         Auth {@link User} do not match
     */
    public void toggleLike(String username, String tweetId) throws NotFoundException, UnauthorisedUserAccessException;

    /**
     * Add a comment to a {@link Tweet}
     * 
     * @param username       - The user who is adding the comment.
     * @param tweetId        - The id of the Tweet where the comment is to be added.
     * @param commentMessage - The comment message.
     * @return
     * @throws NotFoundException               If the User or Tweet is not found.
     * @throws UnauthorisedUserAccessException If the requesting {@link User} and
     *                                         Auth {@link User} do not match
     */
    public Tweet addComment(String username, String tweetId, String commentMessage)
            throws NotFoundException, UnauthorisedUserAccessException;
}
