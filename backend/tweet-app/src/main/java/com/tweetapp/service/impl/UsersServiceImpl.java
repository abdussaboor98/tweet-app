package com.tweetapp.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.tweetapp.entity.UserEntity;
import com.tweetapp.exception.FieldValueAlreadyInUseException;
import com.tweetapp.exception.NotFoundException;
import com.tweetapp.model.User;
import com.tweetapp.repo.UsersRepo;
import com.tweetapp.service.UsersService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UsersServiceImpl implements UsersService, UserDetailsService {

    private UsersRepo usersRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsersServiceImpl(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    @Override
    public User registerUser(User user) throws FieldValueAlreadyInUseException {
        if (usersRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new FieldValueAlreadyInUseException(FieldValueAlreadyInUseException.EMAIL_ALREADY_IN_USE);
        }
        if (usersRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new FieldValueAlreadyInUseException(FieldValueAlreadyInUseException.USERNAME_ALREADY_IN_USE);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        BeanUtils.copyProperties(usersRepo.save(userEntity), user);
        return user;
    }

    @Override
    public User getUserByUsername(String username) throws NotFoundException {
        User user = new User();
        Optional<UserEntity> userEntity = usersRepo.findByUsername(username);
        if (userEntity.isPresent()) {
            BeanUtils.copyProperties(userEntity.get(), user);
            return user;
        } else {
            throw new NotFoundException(NotFoundException.USER_NOT_FOUND);
        }
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        List<UserEntity> userEntities = usersRepo.findAll();
        log.info("Fetched {} users", userEntities.size());
        userEntities.forEach(userEntity -> {
            User user = new User();
            BeanUtils.copyProperties(userEntity, user);
            users.add(user);
        });
        return users;
    }

    @Override
    public List<User> searchByPartialUsername(String partialUsername) {
        List<User> users = new ArrayList<>();
        List<UserEntity> userEntities = usersRepo.searchByPartialUsername(partialUsername);
        userEntities.forEach(userEntity -> {
            User user = new User();
            BeanUtils.copyProperties(userEntity, user);
            users.add(user);
        });
        return users;
    }

    @Override
    public User changeForgottenPassword(String username, String newPassword) throws NotFoundException {
        User user = new User();
        UserEntity userEntity = usersRepo.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(NotFoundException.USER_NOT_FOUND));
        userEntity.setPassword(passwordEncoder.encode(newPassword));
        BeanUtils.copyProperties(usersRepo.save(userEntity), user);
        return user;
    }

    // For spring security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = usersRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The username '" + username + "' is not found."));
        return new org.springframework.security.core.userdetails.User(userEntity.getUsername(),
                userEntity.getPassword(), new ArrayList<>());
    }
}
