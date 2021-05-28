package com.tweetapp.service.impl;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;
import java.util.stream.Collectors;

import com.tweetapp.entity.CommentEntity;
import com.tweetapp.entity.TweetEntity;
import com.tweetapp.entity.UserEntity;
import com.tweetapp.exception.NotFoundException;
import com.tweetapp.exception.UnauthorisedUserAccessException;
import com.tweetapp.model.Tweet;
import com.tweetapp.repo.TweetsRepo;
import com.tweetapp.repo.UsersRepo;
import com.tweetapp.service.TweetsService;
import com.tweetapp.util.DateTimeUtil;
import com.tweetapp.util.ModelEntityMappingUtil;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TweetsServiceImpl implements TweetsService {

    @Autowired
    private TweetsRepo tweetsRepo;

    @Autowired
    private UsersRepo usersRepo;

    // Match the username and the authenticated JWT username
    private void validateUsernameAccess(String passedUsername) throws UnauthorisedUserAccessException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String authUsername = (String) auth.getPrincipal();
        log.info("Auth Username: {}", authUsername);
        if (!authUsername.equals(passedUsername)) {
            throw new UnauthorisedUserAccessException();
        }
    }

    // Check if the username exists
    private void validateUsername(String passedUsername) throws NotFoundException {
        if (!usersRepo.findByUsername(passedUsername).isPresent()) {
            throw new NotFoundException(NotFoundException.USER_NOT_FOUND);
        }
    }

    @Override
    public Tweet addTweet(String username, String tweetMessage)
            throws NotFoundException, UnauthorisedUserAccessException {

        UserEntity userEntity = usersRepo.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        // Create new Tweet
        TweetEntity tweetEntity = new TweetEntity();
        Tweet savedTweet = new Tweet();
        validateUsernameAccess(username);
        validateUsername(username);
        tweetEntity.setUsername(username);
        tweetEntity.setFirstName(userEntity.getFirstName());
        tweetEntity.setMessage(tweetMessage);
        tweetEntity.setCreatedDateTime(LocalDateTime.now(ZoneId.of("UTC")));
        tweetEntity.setComments(new ArrayList<>());
        tweetEntity.setLikedUsernames(new HashSet<>());
        tweetEntity.setEdited(false);

        // Save the tweet
        TweetEntity savedTweetEntity = tweetsRepo.save(tweetEntity);

        // Copy the entity to the model
        BeanUtils.copyProperties(savedTweetEntity, savedTweet);
        savedTweet.setComments(new ArrayList<>());
        savedTweet.setCreatedDateTime(DateTimeUtil.localToZonedDateTimeAtUTC(savedTweetEntity.getCreatedDateTime()));

        log.info("New tweet posted.");
        return savedTweet;
    }

    @Override
    public Tweet updateTweet(String username, String tweetMessage, String tweetId)
            throws UnauthorisedUserAccessException, NotFoundException {
        Tweet updatedTweet = new Tweet();
        validateUsernameAccess(username);
        validateUsername(username);

        // Check if tweet exists
        TweetEntity tweetEntity = tweetsRepo.findByIdAndUsername(tweetId, username)
                .orElseThrow(() -> new NotFoundException(NotFoundException.TWEET_NOT_FOUND));
        tweetEntity.setMessage(tweetMessage);
        tweetEntity.setEdited(true);

        // Update tweet
        TweetEntity updatedTweetEntity = tweetsRepo.save(tweetEntity);

        ModelEntityMappingUtil.mapTweetEntityToModel(updatedTweetEntity, updatedTweet);
        return updatedTweet;
    }

    @Override
    public List<Tweet> getAllTweets() {
        PriorityQueue<Tweet> tweets = new PriorityQueue<>((t1, t2) -> {
            if (t1.getCreatedDateTime().isBefore(t2.getCreatedDateTime()))
                return 1;
            return -1;
        });

        // Get tweets in descending order od crerate time
        List<TweetEntity> tweetEntities = tweetsRepo.findAll();
        tweetEntities.forEach(tweetEntity -> {
            Tweet tweet = new Tweet();
            ModelEntityMappingUtil.mapTweetEntityToModel(tweetEntity, tweet);
            tweets.add(tweet);
        });
        return tweets.stream().collect(Collectors.toList());
    }

    @Override
    public List<Tweet> getAllTweetsByUsername(String username) throws NotFoundException {
        List<Tweet> tweets = new ArrayList<>();
        validateUsername(username);
        List<TweetEntity> tweetEntities = tweetsRepo.findAllByUsername(username);
        tweetEntities.forEach(tweetEntity -> {
            Tweet tweet = new Tweet();
            ModelEntityMappingUtil.mapTweetEntityToModel(tweetEntity, tweet);
            tweets.add(tweet);
        });
        return tweets;
    }

    @Override
    public boolean deleteTweet(String username, String tweetId)
            throws NotFoundException, UnauthorisedUserAccessException {
        validateUsernameAccess(username);
        validateUsername(username);
        // Check if tweet exists
        TweetEntity tweetEntity = tweetsRepo.findByIdAndUsername(tweetId, username)
                .orElseThrow(() -> new NotFoundException(NotFoundException.TWEET_NOT_FOUND));
        tweetsRepo.delete(tweetEntity);
        return !tweetsRepo.findByIdAndUsername(tweetId, username).isPresent();
    }

    @Override
    public void toggleLike(String username, String tweetId) throws NotFoundException, UnauthorisedUserAccessException {
        validateUsernameAccess(username);
        validateUsername(username);
        TweetEntity tweetEntity = tweetsRepo.findById(tweetId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.TWEET_NOT_FOUND));
        Set<String> likedUsernames = tweetEntity.getLikedUsernames();
        // Add the username if it does not extsts or delete if it does
        if (likedUsernames.contains(username)) {
            likedUsernames.remove(username);
        } else {
            likedUsernames.add(username);
        }
        // Save the updated likes
        tweetEntity.setLikedUsernames(likedUsernames);
        tweetsRepo.save(tweetEntity);
    }

    @Override
    public Tweet addComment(String username, String tweetId, String commentMessage)
            throws NotFoundException, UnauthorisedUserAccessException {

        UserEntity userEntity = usersRepo.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        Tweet updatedTweet = new Tweet();
        validateUsernameAccess(username);
        validateUsername(username);

        // Get the tweet where to add the comment
        TweetEntity tweetEntity = tweetsRepo.findById(tweetId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.TWEET_NOT_FOUND));
        List<CommentEntity> comments = tweetEntity.getComments();

        // Create the new comment
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setId(tweetId + "-" + comments.size());
        commentEntity.setMessage(commentMessage);
        commentEntity.setUsername(username);
        commentEntity.setFirstName(userEntity.getFirstName());
        commentEntity.setCreatedDateTime(LocalDateTime.now(ZoneId.of("UTC")));

        // Add the new comment to the fetched tweet
        comments.add(commentEntity);
        tweetEntity.setComments(comments);

        ModelEntityMappingUtil.mapTweetEntityToModel(tweetsRepo.save(tweetEntity), updatedTweet);

        return updatedTweet;

    }

}
