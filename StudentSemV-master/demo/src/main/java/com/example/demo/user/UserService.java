package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    final private UserRespository userRespository;
    @Autowired
    public UserService(UserRespository userRespository){
        this.userRespository = userRespository;
    }
    public List<AppUser> getUsers() {
        return userRespository.findAll();
    }
    public AppUser getUserById(Long userId) {
        AppUser user = userRespository.findById(userId).orElseThrow(() -> new IllegalStateException("User with id " + userId + " does not exists"));
        return  user;
    }
    public AppUser getUserByUsername(String username) {
        AppUser user = userRespository.findUserByUsername(username).orElseThrow(() -> new IllegalStateException("User with username " + username + " does not exists"));
        return  user;
    }
    public void addNewUser(AppUser user) {
        Optional<AppUser> userOptional = userRespository
                .findUserByUsernameAndEmail(user.getUsername(), user.getEmail());

        if(userOptional.isPresent())
        {
            throw new IllegalStateException("User exist");
        }
        userRespository.save(user);
    }
    public void deleteUser(Long userId) {
        boolean exists = userRespository.existsById(userId);
        if(!exists)
        {
            throw new IllegalStateException("User with id " + userId + " does not exists");
        }
        userRespository.deleteById(userId);
    }

    @Transactional
    public void updateUser(Long userId, String username, String password, String email) {
        AppUser user = userRespository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        + userId + " does not exists"));
        if(username != null && username.length() > 0 && !Objects.equals(user.getUsername(), username))
        {
            Optional<AppUser> userOptional = userRespository.findUserByUsername(username);
            if(userOptional.isPresent())
            {
                throw new IllegalStateException("Username taken");
            }
            user.setUsername(username);
        }
        if(password != null && password.length() > 0 && !Objects.equals(user.getPassword(), password))
        {
            user.setPassword(password);
        }
        if(email != null && email.length() > 0 && !Objects.equals(user.getEmail(), email))
        {
            Optional<AppUser> userOptional = userRespository.findUserByEmail(email);
            if(userOptional.isPresent())
            {
                throw new IllegalStateException("Email taken");
            }
            user.setEmail(email);
        }
    }
    @Transactional
    public void updateUser(Long userId, AppUser user) {
        AppUser dbUser = userRespository.findById(userId)
                .orElseThrow(() -> new IllegalStateException(
                        + userId + " does not exists"));

        dbUser.setUsername(user.getUsername());
        dbUser.setEmail(user.getEmail());
        dbUser.setPassword(user.getPassword());
    }
}
