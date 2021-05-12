package com.tweetapp.service;

import java.util.List;

import com.tweetapp.exception.FieldValueAlreadyInUseException;
import com.tweetapp.exception.NotFoundException;
import com.tweetapp.model.User;

public interface UsersService {
    
    public User registerUser(User user) throws FieldValueAlreadyInUseException;

    public User getUserByUsername(String username) throws NotFoundException;

    public List<User> getAllUsers();

    public List<User> searchByPartialUsername(String partialUsername);

    public User changeForgottenPassword(String username, String newPassword) throws NotFoundException;
}
