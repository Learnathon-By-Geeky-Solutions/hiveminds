package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.dto.PostDTO;
import com.example.careerPilot.demo.dto.PostRequest;
import com.example.careerPilot.demo.entity.Community;
import com.example.careerPilot.demo.entity.Post;
import com.example.careerPilot.demo.entity.User;
import com.example.careerPilot.demo.exception.PostNotFoundException;
import com.example.careerPilot.demo.repository.CommunityRepository;
import com.example.careerPilot.demo.repository.PostRepository;
import com.example.careerPilot.demo.repository.userRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j  // Enables logging
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final userRepository userRepository;
    private final CommunityRepository communityRepository;


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
        post.setApproved(true);
        return postRepository.save(post);
    }


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

    public PostDTO createPostByCommunity(@Valid PostRequest postRequest, Long communityId, UserDetails userDetails) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found with id: " + communityId));
        Post post = new Post();
        post.setUser(userRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found with username: " + userDetails.getUsername())));
        post.setCommunity(community);
        post.setContent(postRequest.getContent());
        post.setImage(postRequest.getImage());
        post.setVisibility(postRequest.getVisibility());
        postRepository.save(post);
        return PostDTO.fromEntity(post);
    }

    public Page<PostDTO> getPostByCommunityId(Long communityId, Pageable pageable) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found with id: " + communityId));
         Page<Post> posts = postRepository.findPostByCommunity(community,pageable);
         return posts.map(post-> PostDTO.fromEntity(post));
    }

    public Page<PostDTO> getPostByUserId(Long userId , Pageable pageable) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Page<Post> posts = postRepository.findPostByUser(user,pageable);
        return posts.map(post -> PostDTO.fromEntity(post));
    }
}


