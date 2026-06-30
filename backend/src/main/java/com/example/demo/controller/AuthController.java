package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepository repo, PasswordEncoder encoder, JwtService jwt) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginPage() {
        return ResponseEntity.ok("login-page");
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (repo.existsByUsername(user.getUsername())) {
            return "Username already exists";
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return "User registered";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        var dbUser = repo.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwt.generateToken(dbUser.getUsername());
    }

    @PostMapping("/logout")
public ResponseEntity<Void> logout(HttpServletResponse response) {
    Cookie cookie = new Cookie("refreshToken", null);
    cookie.setMaxAge(0); // lejár azonnal
    cookie.setPath("/auth/refresh"); // ugyanaz a path, mint ahol használod
    cookie.setHttpOnly(true);
    cookie.setSecure(true); // ha HTTPS-t használsz

    response.addCookie(cookie);

    return ResponseEntity.ok().build();
}

}
