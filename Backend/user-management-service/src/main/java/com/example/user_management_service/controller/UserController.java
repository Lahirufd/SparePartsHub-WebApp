package com.example.user_management_service.controller;

import com.example.user_management_service.data.User;
import com.example.user_management_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/users")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User existingUser = userService.findUserByUsername(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping(path = "/users")
    public List<User> findAllUsers() {
        return userService.getUsers();
    }

    @DeleteMapping(path = "/users/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable int id) {
        boolean isDeleted = userService.deleteUserById(id);

        if (isDeleted) {
            return ResponseEntity.ok("User account deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    @GetMapping(path = "/users", params = "username")
    public int findUserIdByUsername(@RequestParam String username) {
        return userService.findUserIdByUsername(username);
    }
}
