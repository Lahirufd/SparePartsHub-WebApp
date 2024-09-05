package com.example.user_management_service.service;

import com.example.user_management_service.data.User;
import com.example.user_management_service.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public boolean deleteUserById(int id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public int findUserIdByUsername(String username) {
        return userRepository.findUserIdByUsername(username);
    }
}
