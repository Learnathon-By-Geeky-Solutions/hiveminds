package com.example.careerPilot.demo.controller;

import com.example.careerPilot.demo.entity.Post;
import com.example.careerPilot.demo.service.PostService;
import com.example.careerPilot.demo.repository.userRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j  // Enables logging
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final userRepository userRepository;

    // Get all posts (Requires authentication)
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        log.info("GET /api/posts called");
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post idPost = postService.getPostById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        return ResponseEntity.ok(idPost);
    }



//     Create a new post (Requires authentication)
//    @PreAuthorize("isAuthenticated()")
//    @PostMapping
//    public ResponseEntity<Post> createPost(@RequestBody Post post) {
//        log.info("POST /api/posts called with data: {}", post);
//        Post savedPost = postService.createPost(post);
//        return ResponseEntity.ok(savedPost);
//    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, @AuthenticationPrincipal UserDetails userDetails) {
        log.info("POST /api/posts called with data: {}", post);
        Post savedPost = postService.createPost(post, userDetails.getUsername());
        return ResponseEntity.ok(savedPost);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        return postService.deletePost(id, userDetails.getUsername())
                ? ResponseEntity.ok().build()
                : ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to delete this post");
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post post,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Post updatedPost = postService.updatePost(id, post, userDetails.getUsername());
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }


}
