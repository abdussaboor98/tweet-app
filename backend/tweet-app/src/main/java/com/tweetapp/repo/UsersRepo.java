package com.tweetapp.repo;

import java.util.List;
import java.util.Optional;

import com.tweetapp.entity.UserEntity;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@EnableScan
public interface UsersRepo extends CrudRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUsername(String username);

    List<UserEntity> findByUsernameContaining(String partialUsername);

    List<UserEntity> findAll();
}
