package com.tweetapp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
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
import com.tweetapp.service.impl.TweetsServiceImpl;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class TweetsServiceTests {

    @InjectMocks
    private TweetsServiceImpl tweetsService;

    @Mock
    private TweetsRepo tweetsRepo;

    @Mock
    private UsersRepo usersRepo;

    private static String username1 = "user1";

    private static String username2 = "user2";

    private static UserEntity mockUserEntity1;

    private static UserEntity mockUserEntity2;

    private static Authentication mockAuth;

    private static List<TweetEntity> tweets;

    @BeforeAll
    static void beforeAll() {
        mockUserEntity1 = new UserEntity("user_id1", "user1@email.com", username1, "password", "User1", null,
                "9087654321");
        mockUserEntity2 = new UserEntity("user_id2", "user2@email.com", username2, "password", "User2", null,
                "9087654123");
        mockAuth = new UsernamePasswordAuthenticationToken(username1, null);

        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(mockAuth);
        SecurityContextHolder.setContext(securityContext);

        Set<String> emptyLikedUsernamesSet = new HashSet<>();
        List<CommentEntity> emptyCommentsList = new ArrayList<>();
        LocalDateTime currentDateTime = LocalDateTime.now(ZoneId.of("UTC"));

        tweets = new ArrayList<>();
        tweets.add(new TweetEntity("tweet_id1", "Hello!!", username1, mockUserEntity1.getFirstName(),
                emptyLikedUsernamesSet, emptyCommentsList, currentDateTime, false));
        tweets.add(new TweetEntity("tweet_id2", "Hi!!", username2, mockUserEntity2.getFirstName(),
                emptyLikedUsernamesSet, emptyCommentsList, currentDateTime.plusSeconds(20), false));
        tweets.add(new TweetEntity("tweet_id3", "How are you", username1, mockUserEntity1.getFirstName(),
                emptyLikedUsernamesSet, emptyCommentsList, currentDateTime.plusSeconds(30), false));
        tweets.add(new TweetEntity("tweet_id4", "Good", username1, mockUserEntity1.getFirstName(),
                emptyLikedUsernamesSet, emptyCommentsList, currentDateTime.plusSeconds(10), false));
    }

    @BeforeEach
    void beforeEach() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void test_addTweet_Success() throws NotFoundException, UnauthorisedUserAccessException {

        String tweetMessage = "Hello!!";

        when(usersRepo.findByUsername(username1)).thenReturn(Optional.of(mockUserEntity1));
        when(tweetsRepo.save(any(TweetEntity.class))).thenAnswer((invocation) -> {
            return invocation.getArgument(0);
        });

        Tweet savedTweet = tweetsService.addTweet(username1, tweetMessage);

        assertEquals(username1, savedTweet.getUsername());
        assertEquals(tweetMessage, savedTweet.getMessage());
        assertEquals(mockUserEntity1.getFirstName(), savedTweet.getFirstName());
        assertTrue(savedTweet.getLikedUsernames().isEmpty());
        assertTrue(savedTweet.getComments().isEmpty());
    }

    @Test
    void test_addTweet_UserNotFound() {

        String invalidUser = "user123";
        String tweetMessage = "Hello!!";

        when(usersRepo.findByUsername(invalidUser)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> {
            tweetsService.addTweet(invalidUser, tweetMessage);
        });
    }

    @Test
    void test_addTweet_UnauthorizedUserAccessException() {

        String invalidUser = "user123";
        String tweetMessage = "Hello!!";

        when(usersRepo.findByUsername(invalidUser)).thenReturn(Optional.of(new UserEntity()));

        assertThrows(UnauthorisedUserAccessException.class, () -> {
            tweetsService.addTweet(invalidUser, tweetMessage);
        });
    }

    @Test
    void test_getAllTweets_Success() {
        when(tweetsRepo.findAll()).thenReturn(tweets);

        List<Tweet> actualTweets = tweetsService.getAllTweets();
        assertEquals(tweets.size(), actualTweets.size());
        for (int i = 1; i < actualTweets.size(); i++) {
            assertTrue(actualTweets.get(i).getCreatedDateTime().isBefore(actualTweets.get(i - 1).getCreatedDateTime()));
        }
        for (Tweet tweet : actualTweets) {
            System.out.println(tweet);
        }
    }

    @Test
    void test_getAllTweetsByUsername_Success() throws NotFoundException {
        List<TweetEntity> expectedTweets = tweets.stream().filter((tweet) -> tweet.getUsername().equals(username1))
                .collect(Collectors.toList());
        when(usersRepo.findByUsername(username1)).thenReturn(Optional.of(mockUserEntity1));
        when(tweetsRepo.findAllByUsername(username1)).thenReturn(expectedTweets);

        List<Tweet> actualTweets = tweetsService.getAllTweetsByUsername(username1);

        assertEquals(expectedTweets.size(), actualTweets.size());
        for (Tweet tweet : actualTweets) {
            tweet.getUsername().equals(username1);
        }
    }

    @Test
    void test_getAllTweetsByUsername_UserNotFound() throws NotFoundException {

        when(usersRepo.findByUsername(username1)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> {
            tweetsService.getAllTweetsByUsername(username1);
        });
    }
}
