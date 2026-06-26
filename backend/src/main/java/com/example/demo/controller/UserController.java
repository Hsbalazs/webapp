package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return service.create(
                user.getUsername(),
                user.getEmail(),
                user.getPassword()
        );
    }

    @GetMapping("/{username}")
    public User getByUsername(@PathVariable String username) {
        return service.getByUsername(username);
    }
}
