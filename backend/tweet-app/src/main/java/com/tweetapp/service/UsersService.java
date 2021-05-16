package com.tweetapp.service;

import java.util.List;

import com.tweetapp.exception.FieldValueAlreadyInUseException;
import com.tweetapp.exception.NotFoundException;
import com.tweetapp.model.User;

public interface UsersService {

    /**
     * Register new user
     * 
     * @param user - {@link User} to be registered
     * @return The registered {@link User}
     * @throws FieldValueAlreadyInUseException - When the username or email is
     *                                         already registered
     */
    public User registerUser(User user) throws FieldValueAlreadyInUseException;

    /**
     * Returns the {@link User} based on the username.
     * 
     * @param username - The username of the {@link User} that is to be fetched.
     * @return - The {@link User}
     * @throws NotFoundException - When the {@link User} is not found
     */
    public User getUserByUsername(String username) throws NotFoundException;

    /**
     * Get all the {@link User}s
     * 
     * @return - List of users {@link List<User>}
     */
    public List<User> getAllUsers();

    /**
     * Serach for users matching the partialUsername.
     * 
     * @param partialUsername - Username string to search for
     * @return -List of users {@link List<User>}
     */
    public List<User> searchByPartialUsername(String partialUsername);

    /**
     * Change the password for the user.
     * 
     * @param username    - {@link User}'s username
     * @param newPassword - New password to be set
     * @return - The new user
     * @throws NotFoundException - If the user with the dpecified username not
     *                           found.
     */
    public User changeForgottenPassword(String username, String newPassword) throws NotFoundException;
}
