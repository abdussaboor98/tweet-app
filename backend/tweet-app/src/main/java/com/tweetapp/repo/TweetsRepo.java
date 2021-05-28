package com.tweetapp.repo;

import java.util.List;
import java.util.Optional;

import com.tweetapp.entity.TweetEntity;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@EnableScan
public interface TweetsRepo extends CrudRepository<TweetEntity, String> {

    List<TweetEntity> findAll();

    List<TweetEntity> findAllByUsername(String username);

    Optional<TweetEntity> findByIdAndUsername(String id, String username);
}
