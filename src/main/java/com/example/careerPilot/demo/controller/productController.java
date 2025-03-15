package com.example.careerPilot.demo.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class productController {

    @GetMapping
    @PreAuthorize("isAuthenticated()") // Ensures only logged-in users can access
    public List<String> getProducts() {
        return Arrays.asList("Laptop", "Smartphone", "Headphones", "Monitor");
    }
}
