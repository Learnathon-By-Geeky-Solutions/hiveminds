package com.example.careerPilot.demo.controller;

import com.example.careerPilot.demo.dto.CommentDTO;
import com.example.careerPilot.demo.dto.CommentRequest;
import com.example.careerPilot.demo.entity.Comment;
import com.example.careerPilot.demo.exception.CommentNotFoundException;
import com.example.careerPilot.demo.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable Long postId) {
        log.info("GET /api/posts/{}/comments called", postId);
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        List<CommentDTO> commentDTOs = comments.stream()
                .map(CommentDTO::fromComment)
                .collect(Collectors.toList());
        return ResponseEntity.ok(commentDTOs);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentRequest commentRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        log.info("POST /api/posts/{}/comments called", postId);

        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        Comment savedComment = commentService.createComment(postId, comment, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(CommentDTO.fromComment(savedComment));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{commentId}")
    public ResponseEntity<CommentDTO> getCommentById(
            @PathVariable Long postId,
            @PathVariable Long commentId) throws CommentNotFoundException {
        log.info("GET /api/posts/{}/comments/{} called", postId, commentId);
        Comment comment = commentService.getCommentById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found with id: " + commentId));
        return ResponseEntity.ok(CommentDTO.fromComment(comment));
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @Valid @RequestBody CommentRequest commentRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        log.info("PUT /api/posts/{}/comments/{} called", postId, commentId);
        try {
            Comment commentUpdates = new Comment();
            commentUpdates.setContent(commentRequest.getContent());
            Comment updatedComment = commentService.updateComment(commentId, commentUpdates, userDetails.getUsername());
            return ResponseEntity.ok(CommentDTO.fromComment(updatedComment));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        log.info("DELETE /api/posts/{}/comments/{} called", postId, commentId);
        boolean deleted = commentService.deleteComment(commentId, userDetails.getUsername());
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You don't have permission to delete this comment");
        }
    }
}