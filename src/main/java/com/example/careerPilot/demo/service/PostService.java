package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.entity.Post;
import com.example.careerPilot.demo.entity.User;
import com.example.careerPilot.demo.exception.PostNotFoundException;
import com.example.careerPilot.demo.repository.PostRepository;
import com.example.careerPilot.demo.repository.userRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j  // Enables logging
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final userRepository userRepository;


    public List<Post> getAllPosts() {
        log.debug("Fetching all posts from the database");
        return postRepository.findAll();
    }

    public Post getPostById(Long id) throws PostNotFoundException {
        log.debug("Fetching post with ID: {}", id);
        return postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found with id: " + id));
    }



    public Post createPost(Post post, String username) {
        log.debug("Saving new post for user: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        post.setUser(user);
        return postRepository.save(post);
    }


    // Add deletePost method
    public void deletePost(Long id, String username) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        // Check if the user is the owner of the post
        if (post.getUser() == null || !post.getUser().getUsername().equals(username)) {
            throw new RuntimeException("You don't have permission to delete this post");
        }

        postRepository.delete(post);
        log.info("Post with ID {} deleted by user {}", id, username);
    }

    public Post updatePost(Long id, Post updatedPost, String username) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        if (existingPost.getUser() == null || !existingPost.getUser().getUsername().equals(username)) {
            throw new RuntimeException("You don't have permission to update this post");
        }

        // Update only allowed fields
        existingPost.setContent(updatedPost.getContent());
        existingPost.setImage(updatedPost.getImage());
        existingPost.setVisibility(updatedPost.getVisibility());

        return postRepository.save(existingPost);
    }

}


