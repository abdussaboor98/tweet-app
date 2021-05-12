package com.tweetapp.repo;

import java.util.List;
import java.util.Optional;

import com.tweetapp.entity.TweetEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetsRepo extends MongoRepository<TweetEntity, String> {
    
    List<TweetEntity> findAllByUsername(String username);

    Optional<TweetEntity> findByIdAndUsername(String id, String username);
}
