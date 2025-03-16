package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.entity.Comment;
import com.example.careerPilot.demo.entity.Post;
import com.example.careerPilot.demo.entity.User;
import com.example.careerPilot.demo.repository.CommentRepository;
import com.example.careerPilot.demo.repository.PostRepository;
import com.example.careerPilot.demo.repository.userRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final userRepository userRepository;

    public List<Comment> getCommentsByPostId(Long postId) {
        log.debug("Fetching comments for post with ID: {}", postId);
        return commentRepository.findByPostPostId(postId);
    }

    public Comment createComment(Long postId, Comment comment, String username) {
        log.debug("Creating comment for post ID: {} by user: {}", postId, username);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        comment.setPost(post);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    public Optional<Comment> getCommentById(Long id) {
        log.debug("Fetching comment with ID: {}", id);
        return commentRepository.findById(id);
    }

    public Comment updateComment(Long id, Comment updatedComment, String username) {
        log.debug("Updating comment ID: {} by user: {}", id, username);

        Comment existingComment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));

        if (existingComment.getUser() == null || !existingComment.getUser().getUsername().equals(username)) {
            throw new RuntimeException("You don't have permission to update this comment");
        }

        // Update only the content
        existingComment.setContent(updatedComment.getContent());

        return commentRepository.save(existingComment);
    }

    public boolean deleteComment(Long id, String username) {
        log.debug("Attempting to delete comment ID: {} by user: {}", id, username);

        Optional<Comment> commentOpt = commentRepository.findById(id);
        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            if (comment.getUser() != null && comment.getUser().getUsername().equals(username)) {
                commentRepository.delete(comment);
                log.info("Comment ID: {} successfully deleted by user: {}", id, username);
                return true;
            }
            log.warn("Unauthorized deletion attempt of comment ID: {} by user: {}", id, username);
        }
        return false;
    }
}