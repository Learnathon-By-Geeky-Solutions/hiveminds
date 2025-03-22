//package com.example.careerPilot.demo.repository;
//
//import com.example.careerPilot.demo.entity.JobPost;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Repository
//public interface JobPostRepository extends JpaRepository<JobPost, Long> {
//    List<JobPost> findByCompanyId(Long companyId);
//
//    @Query("SELECT j FROM JobPost j WHERE j.status = 'OPEN' AND (j.applicationDeadline IS NULL OR j.applicationDeadline >= ?1)")
//    List<JobPost> findActiveJobPosts(LocalDate currentDate);
//}