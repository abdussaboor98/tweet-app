package com.tweetapp.controller;

import java.util.List;

import javax.validation.Valid;

import com.tweetapp.exception.FieldValueAlreadyInUseException;
import com.tweetapp.exception.NotFoundException;
import com.tweetapp.model.User;
import com.tweetapp.service.UsersService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("/api/v1.0/tweets/")
@Slf4j
public class UsersController {

    @Autowired
    private UsersService usersService;
    
    @PostMapping(value="register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody User newUser) throws FieldValueAlreadyInUseException {
        log.info("Recieved request for new user registration.");
        User user = usersService.registerUser(newUser);
        log.info("New user registered: {}", user.getUsername());
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping(value="users/all")
    public ResponseEntity<List<User>> getAllUsers() {
        log.info("Recieved request to get all users.");
        List<User> users = usersService.getAllUsers();
        log.info("Found {} users in total.", users.size());
        return new ResponseEntity<>(users ,HttpStatus.OK);
    }

    @GetMapping(value="user/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) throws NotFoundException {
        log.info("Recieved request to get specific user.");
        User user = usersService.getUserByUsername(username);
        log.info("Found user");
        return new ResponseEntity<>(user ,HttpStatus.OK);
    }

    @GetMapping(value="user/search/{username}")
    public ResponseEntity<List<User>> searchUser(@PathVariable String username){
        log.info("Recieved request to search for user.");
        List<User> users = usersService.searchByPartialUsername(username);
        log.info("Found {} matching usernames", users.size());
        return new ResponseEntity<>(users ,HttpStatus.OK);
    }
    
    @PostMapping(value="{username}/forgot")
    public ResponseEntity<User> changeForgottenPassword(@PathVariable String username, @RequestBody String newPassword) throws NotFoundException {
        log.info("Recieved request for password change.");
        usersService.changeForgottenPassword(username, newPassword);
        log.info("Password changed");
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
