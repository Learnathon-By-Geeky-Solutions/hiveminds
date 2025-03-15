package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.entity.Post;
import com.example.careerPilot.demo.entity.User;
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

    public Optional<Post> getPostById(Long id) {
        log.debug("Fetching post with ID: {}", id);
        return postRepository.findById(id);
    }
//    public Post createPost(Post post) {
//        log.debug("Saving new post: {}", post);
//        return postRepository.save(post);
//    }

    public Post createPost(Post post, String username) {
        log.debug("Saving new post for user: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        post.setUser(user);
        return postRepository.save(post);
    }


    public boolean deletePost(Long id, String username) {
        Optional<Post> postOpt = postRepository.findById(id);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            if (post.getUser() != null && post.getUser().getUsername().equals(username)) {
                postRepository.delete(post);
                return true;
            }
        }
        return false;
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


