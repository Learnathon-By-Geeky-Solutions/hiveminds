//package com.example.careerPilot.demo.service;
//
//import com.example.careerPilot.demo.dto.JobPostDTO;
//import com.example.careerPilot.demo.dto.JobSkillDTO;
//import com.example.careerPilot.demo.entity.*;
//import com.example.careerPilot.demo.exception.ResourceNotFoundException;
//import com.example.careerPilot.demo.exception.UnauthorizedException;
//import com.example.careerPilot.demo.repository.*;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class JobPostService {
//    private final JobPostRepository jobPostRepository;
//    private final CompanyRepository companyRepository;
//    private final CompanyEmployeeRepository companyEmployeeRepository;
//    private final SkillRepository skillRepository;
//    private final JobSkillRepository jobSkillRepository;
//
//    @Transactional
//    public JobPostDTO.Response createJobPost(Long companyId, JobPostDTO.Request request, Long currentUserId) {
//        // Check if user has permission (Admin or Moderator)
//        Optional<CompanyEmployee> employeeOpt = companyEmployeeRepository.findByCompanyIdAndUserId(companyId, currentUserId);
//
//        if (employeeOpt.isEmpty() ||
//                (employeeOpt.get().getRole() != CompanyEmployee.Role.ADMIN &&
//                        employeeOpt.get().getRole() != CompanyEmployee.Role.MODERATOR)) {
//            throw new UnauthorizedException("Only admins and moderators can create job posts");
//        }
//
//        Company company = companyRepository.findById(companyId)
//                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + companyId));
//
//        JobPost jobPost = new JobPost();
//        jobPost.setCompany(company);
//        jobPost.setJobTitle(request.getJobTitle());
//        jobPost.setJobDescription(request.getJobDescription());
//        jobPost.setRequirements(request.getRequirements());
//        jobPost.setUpperSalary(request.getUpperSalary() != null ? request.getUpperSalary() : 0);
//        jobPost.setLowerSalary(request.getLowerSalary() != null ? request.getLowerSalary() : 0);
//        jobPost.setLocation(request.getLocation());
//        jobPost.setJobType(request.getJobType());
//        jobPost.setJobCategory(request.getJobCategory());
//        jobPost.setApplicationDeadline(request.getApplicationDeadline());
//        jobPost.setStatus(JobPost.Status.OPEN);
//        jobPost.setJobSkills(new ArrayList<>());
//
//        JobPost savedJobPost = jobPostRepository.save(jobPost);
//
//        // Add job skills if provided
//        if (request.getSkills() != null && !request.getSkills().isEmpty()) {
//            for (JobSkillDTO.Request skillRequest : request.getSkills()) {
//                Skill skill = skillRepository.findById(skillRequest.getSkillId())
//                        .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillRequest.getSkillId()));
//
//                JobSkill jobSkill = JobSkill.builder()
//                        .job(savedJobPost)
//                        .skill(skill)
//                        .proficiencyLevel(skillRequest.getProficiencyLevel())
//                        .build();
//
//                jobSkillRepository.save(jobSkill);
//                savedJobPost.getJobSkills().add(jobSkill);
//            }
//        }
//
//        return JobPostDTO.Response.fromEntity(savedJobPost);
//    }
//
//    public List<JobPostDTO.Response> getAllJobPosts() {
//        // Return all active job posts
//        return jobPostRepository.findActiveJobPosts(LocalDate.now()).stream()
//                .map(JobPostDTO.Response::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    public List<JobPostDTO.Response> getCompanyJobPosts(Long companyId) {
//        if (!companyRepository.existsById(companyId)) {
//            throw new ResourceNotFoundException("Company not found with id: " + companyId);
//        }
//
//        return jobPostRepository.findByCompanyId(companyId).stream()
//                .map(JobPostDTO.Response::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    public JobPostDTO.Response getJobPost(Long jobPostId) {
//        JobPost jobPost = jobPostRepository.findById(jobPostId)
//                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + jobPostId));
//
//        return JobPostDTO.Response.fromEntity(jobPost);
//    }
//
//    @Transactional
//    public JobPostDTO.Response updateJobPost(Long jobPostId, JobPostDTO.Request request, Long currentUserId) {
//        JobPost jobPost = jobPostRepository.findById(jobPostId)
//                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + jobPostId));
//
//        Long companyId = jobPost.getCompany().getId();
//
//        // Check if user has permission (Admin or Moderator)
//        Optional<CompanyEmployee> employeeOpt = companyEmployeeRepository.findByCompanyIdAndUserId(companyId, currentUserId);
//
//        if (employeeOpt.isEmpty() ||
//                (employeeOpt.get().getRole() != CompanyEmployee.Role.ADMIN &&
//                        employeeOpt.get().getRole() != CompanyEmployee.Role.MODERATOR)) {
//            throw new UnauthorizedException("Only admins and moderators can update job posts");
//        }
//
//        jobPost.setJobTitle(request.getJobTitle());
//        jobPost.setJobDescription(request.getJobDescription());
//        jobPost.setRequirements(request.getRequirements());
//        jobPost.setUpperSalary(request.getUpperSalary() != null ? request.getUpperSalary() : 0);
//        jobPost.setLowerSalary(request.getLowerSalary() != null ? request.getLowerSalary() : 0);
//        jobPost.setLocation(request.getLocation());
//        jobPost.setJobType(request.getJobType());
//        jobPost.setJobCategory(request.getJobCategory());
//        jobPost.setApplicationDeadline(request.getApplicationDeadline());
//
//        // Update skills if provided
//        if (request.getSkills() != null) {
//            // Remove existing skills
//            jobSkillRepository.deleteAll(jobPost.getJobSkills());
//            jobPost.getJobSkills().clear();
//
//            // Add new skills
//            for (JobSkillDTO.Request skillRequest : request.getSkills()) {
//                Skill skill = skillRepository.findById(skillRequest.getSkillId())
//                        .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillRequest.getSkillId()));
//
//                JobSkill jobSkill = JobSkill.builder()
//                        .job(jobPost)
//                        .skill(skill)
//                        .proficiencyLevel(skillRequest.getProficiencyLevel())
//                        .build();
//
//                jobSkillRepository.save(jobSkill);
//                jobPost.getJobSkills().add(jobSkill);
//            }
//        }
//
//        JobPost updatedJobPost = jobPostRepository.save(jobPost);
//        return JobPostDTO.Response.fromEntity(updatedJobPost);
//    }
//
//    @Transactional
//    public void deleteJobPost(Long jobPostId, Long currentUserId) {
//        JobPost jobPost = jobPostRepository.findById(jobPostId)
//                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + jobPostId));
//
//        Long companyId = jobPost.getCompany().getId();
//
//        // Check if user has permission (Admin or Moderator)
//        Optional<CompanyEmployee> employeeOpt = companyEmployeeRepository.findByCompanyIdAndUserId(companyId, currentUserId);
//
//        if (employeeOpt.isEmpty() ||
//                (employeeOpt.get().getRole() != CompanyEmployee.Role.ADMIN &&
//                        employeeOpt.get().getRole() != CompanyEmployee.Role.MODERATOR)) {
//            throw new UnauthorizedException("Only admins and moderators can delete job posts");
//        }
//
//        jobPost.setDeletedAt(LocalDateTime.now());
//        jobPost.setStatus(JobPost.Status.CLOSED);
//        jobPostRepository.save(jobPost);
//    }
//
//    @Transactional
//    public JobPostDTO.Response updateJobPostStatus(Long jobPostId, JobPost.Status status, Long currentUserId) {
//        JobPost jobPost = jobPostRepository.findById(jobPostId)
//                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + jobPostId));
//
//        Long companyId = jobPost.getCompany().getId();
//
//        // Check if user has permission (Admin or Moderator)
//        Optional<CompanyEmployee> employeeOpt = companyEmployeeRepository.findByCompanyIdAndUserId(companyId, currentUserId);
//
//        if (employeeOpt.isEmpty() ||
//                (employeeOpt.get().getRole() != CompanyEmployee.Role.ADMIN &&
//                        employeeOpt.get().getRole() != CompanyEmployee.Role.MODERATOR)) {
//            throw new UnauthorizedException("Only admins and moderators can update job post status");
//        }
//
//        jobPost.setStatus(status);
//        JobPost updatedJobPost = jobPostRepository.save(jobPost);
//        return JobPostDTO.Response.fromEntity(updatedJobPost);
//    }
//}