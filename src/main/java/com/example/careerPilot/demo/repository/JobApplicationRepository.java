//package com.example.careerPilot.demo.repository;
//
//import com.example.careerPilot.demo.entity.JobApplication;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
//    List<JobApplication> findByJobPostId(Long jobPostId);
//
//    List<JobApplication> findByApplicantId(Long applicantId);
//
//    Optional<JobApplication> findByJobPostIdAndApplicantId(Long jobPostId, Long applicantId);
//
//    @Query("SELECT a FROM JobApplication a WHERE a.jobPost.company.id = ?1")
//    List<JobApplication> findByCompanyId(Long companyId);
//
//    @Query("SELECT a FROM JobApplication a WHERE a.jobPost.company.id = ?1 AND a.status = ?2")
//    List<JobApplication> findByCompanyIdAndStatus(Long companyId, JobApplication.Status status);
//}