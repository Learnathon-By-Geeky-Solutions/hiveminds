package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.entity.Post;
import com.example.careerPilot.demo.repository.PostRepository;
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

    public List<Post> getAllPosts() {
        log.debug("Fetching all posts from the database");
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        log.debug("Fetching post with ID: {}", id);
        return postRepository.findById(id);
    }
    public Post createPost(Post post) {
        log.debug("Saving new post: {}", post);
        return postRepository.save(post);
    }

}
