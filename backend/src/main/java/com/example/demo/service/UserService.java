package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User create(String username, String email, String password) {
        User user = new User(username, email, password);
        return repo.save(user);
    }

    public User getByUsername(String username) {
        return repo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
