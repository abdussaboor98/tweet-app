package com.tweetapp.repo;

import java.util.List;
import java.util.Optional;

import com.tweetapp.entity.UserEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends MongoRepository<UserEntity, String> {
    
    Optional<UserEntity> findByEmail(String email);
    
    Optional<UserEntity> findByUsername(String username);

    @Query("{'username':{'$regex':?0, $options:'i'}}")
    List<UserEntity> searchByPartialUsername(String partialUsername);
}
