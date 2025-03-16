package com.example.careerPilot.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "job_posts")
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "job_description", columnDefinition = "TEXT", nullable = false)
    private String jobDescription;

    @Column(name = "requirements", columnDefinition = "TEXT")
    private String requirements;

    @Column(name = "upper_range_salary")
    private int upperSalary;
    @Column(name = "lower_range_salary")
    private int lowerSalary;

    @Column(name = "location")
    private String location;

    @Column(name = "job_type", columnDefinition = "ENUM('full_time', 'part_time', 'contract', 'internship', 'temporary') default 'full_time'")
    @Enumerated(EnumType.STRING)
    private JobType jobType = JobType.FULL_TIME;

    @Column(name = "job_category")
    private String jobCategory;

    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    @Column(name = "status", columnDefinition = "ENUM('open', 'closed', 'pending') default 'open'")
    @Enumerated(EnumType.STRING)
    private Status status = Status.OPEN;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    // Enum for job type
    public enum JobType {
        FULL_TIME,
        PART_TIME,
        CONTRACT,
        INTERNSHIP,
        TEMPORARY
    }

    // Enum for status
    public enum Status {
        OPEN,
        CLOSED,
        PENDING
    }
    @OneToMany(mappedBy = "job" , cascade = CascadeType.ALL , orphanRemoval = true)
    private List<JobSkill> jobSkills;

    public void addJobSkill(JobSkill jobSkill) {
        jobSkills.add(jobSkill);
        jobSkill.setJob(this);
    }

    public void removeJobSkill(JobSkill jobSkill) {
        jobSkills.remove(jobSkill);
        jobSkill.setJob(null);
    }
}