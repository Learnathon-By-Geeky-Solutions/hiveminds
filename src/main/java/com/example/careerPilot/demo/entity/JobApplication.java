package com.example.careerPilot.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id", nullable = false)
    private User applicant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_post_id", nullable = false)
    private JobPost jobPost;

    @CreationTimestamp
    @Column(name = "applied_at", updatable = false)
    private LocalDateTime appliedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "VARCHAR(20) default 'PENDING'")
    private Status status = Status.PENDING;

    @Column(name = "cover_letter", columnDefinition = "TEXT")
    private String coverLetter;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}