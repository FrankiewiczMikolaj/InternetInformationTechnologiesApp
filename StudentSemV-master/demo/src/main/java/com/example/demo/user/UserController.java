package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="management/api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public List<AppUser> getUsers()
    {
        return userService.getUsers();
    }
    @GetMapping(path = "id/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public AppUser getUserById(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "username/{username}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public AppUser getUserById(@PathVariable("username") String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public void registerNewUser(@RequestBody AppUser user)
    {
        userService.addNewUser(user);
    }
    @DeleteMapping(path = "{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public void deleteUser(@PathVariable("userId") Long userId)
    {
        userService.deleteUser(userId);
    }

    @PutMapping(path = "{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMINTRAINEE')")
    public void updateUser(
            @PathVariable("userId") Long userId,
            @RequestBody AppUser user
    ) {
        userService.updateUser(userId, user);
    }
}
