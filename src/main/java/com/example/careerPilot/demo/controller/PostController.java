package com.example.careerPilot.demo.controller;

import com.example.careerPilot.demo.dto.PostDTO;
import com.example.careerPilot.demo.dto.PostRequest;
import com.example.careerPilot.demo.entity.Post;
import com.example.careerPilot.demo.exception.PostNotFoundException;
import com.example.careerPilot.demo.service.PostService;
import com.example.careerPilot.demo.repository.userRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j  // Enables logging
@CrossOrigin(origins = "http://localhost:5173/") // Allows requests from the frontend app
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final userRepository userRepository;

    // Get all posts (Requires authentication)
    // Get all posts (Requires authentication)
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        log.info("GET /api/posts called");
        List<Post> posts = postService.getAllPosts();
        List<PostDTO> postDTOs = posts.stream()
                .map(PostDTO::fromEntity) // Use PostDTO.fromEntity
                .collect(Collectors.toList());
        return ResponseEntity.ok(postDTOs);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id) throws PostNotFoundException {
        Post post = postService.getPostById(id);
        PostDTO postDTO = PostDTO.fromEntity(post);
        return ResponseEntity.ok(postDTO);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<PostDTO>> getPostByUserId(@PathVariable Long userId, Pageable pageable) throws PostNotFoundException {
        try {
            Page<PostDTO> post = postService.getPostByUserId(userId , pageable);
        return ResponseEntity.ok(post);
        } catch (Exception e) {
            throw new PostNotFoundException(e.getMessage());
        }
    }



    @PostMapping
    public ResponseEntity<PostDTO> createPost(
            @Valid @RequestBody PostRequest postRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Post post = new Post();
        post.setContent(postRequest.getContent());
        post.setImage(postRequest.getImage());
        post.setVisibility(postRequest.getVisibility());

        Post savedPost = postService.createPost(post, userDetails.getUsername());
        PostDTO savedPostDTO = PostDTO.fromEntity(savedPost); // Use PostDTO.fromEntity
        return ResponseEntity.ok(savedPostDTO);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody PostRequest postRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            Post postUpdates = new Post();
            postUpdates.setContent(postRequest.getContent());
            postUpdates.setImage(postRequest.getImage());
            postUpdates.setVisibility(postRequest.getVisibility());

            Post updatedPost = postService.updatePost(id, postUpdates, userDetails.getUsername());
            PostDTO updatedPostDTO = PostDTO.fromEntity(updatedPost); // Use PostDTO.fromEntity
            return ResponseEntity.ok(updatedPostDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    // Add delete endpoint
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            postService.deletePost(id, userDetails.getUsername());
            return ResponseEntity.ok("Post deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    //community post create
    // api/posts/communityId
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{communityId}")
    public ResponseEntity<?> createPostByCommunity(@Valid @RequestBody PostRequest postRequest,
                                                         @PathVariable Long communityId,
                                                         @AuthenticationPrincipal UserDetails userDetails) {
        try {
            PostDTO createdPost = postService.createPostByCommunity(postRequest,communityId,userDetails);
            return ResponseEntity.ok(createdPost);
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create Post"+e.getMessage());
        }
    }

    //get post by community
    // api/posts/communityId?page=0&size=10
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{communityId}")
    public ResponseEntity<?> getPostByCommunity(@PathVariable Long communityId , Pageable pageable) {
        try{
            Page<PostDTO> posts = postService.getPostByCommunityId(communityId ,pageable);
            return ResponseEntity.ok(posts);
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }



}
