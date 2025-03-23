// JobPostService.java
package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.dto.*;
import com.example.careerPilot.demo.entity.*;
import com.example.careerPilot.demo.exception.ResourceNotFoundException;
import com.example.careerPilot.demo.exception.UnauthorizedException;
import com.example.careerPilot.demo.repository.*;
import com.example.careerPilot.demo.security.CompanySecurity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobPostService {

    private final JobPostRepository jobPostRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;
    private final CompanySecurity companySecurity;

    @Transactional
    public JobPostDTO createJobPost(Long companyId, JobPostRequest request, String username) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        if (!companySecurity.isCompanyAdmin(companyId, username)) {
            throw new UnauthorizedException("Only company admins can create job posts");
        }

        // Validate skills exist
        Set<Long> skillIds = request.getSkills().stream()
                .map(JobSkillRequest::getSkillId)
                .collect(Collectors.toSet());

        List<Skill> skills = skillRepository.findAllBySkillIdIn(skillIds);
        if (skills.size() != skillIds.size()) {
            throw new ResourceNotFoundException("One or more skills not found");
        }

//        JobPost jobPost = new JobPost();
//        jobPost.setCompany(company);
//        jobPost.setJobTitle(request.getJobTitle());
//        jobPost.setJobDescription(request.getJobDescription());
//        jobPost.setRequirements(request.getRequirements());
//        jobPost.setLowerSalary(request.getLowerSalary());
//        jobPost.setUpperSalary(request.getUpperSalary());
//        jobPost.setLocation(request.getLocation());
//        jobPost.setJobType(request.getJobType());
//        jobPost.setJobCategory(request.getJobCategory());
//        jobPost.setApplicationDeadline(request.getApplicationDeadline());

        JobPost jobPost = JobPost.builder()
                .company(company)
                .jobTitle(request.getJobTitle())
                .jobDescription(request.getJobDescription())
                // ... other fields
                .requirements(request.getRequirements())
                .lowerSalary(request.getLowerSalary())
                .upperSalary(request.getUpperSalary())
                .location(request.getLocation())
                .jobType(request.getJobType())
                .jobCategory(request.getJobCategory())
                .applicationDeadline(request.getApplicationDeadline())
                .jobSkills(new ArrayList<>()) // Initialize empty list
                .build();

        // Add job skills
        request.getSkills().forEach(skillReq -> {
            Skill skill = skills.stream()
                    .filter(s -> s.getSkillId().equals(skillReq.getSkillId()))
                    .findFirst()
                    .orElseThrow();

            JobSkill jobSkill = new JobSkill();
            jobSkill.setSkill(skill);
            jobSkill.setProficiencyLevel(skillReq.getProficiencyLevel());
            jobPost.addJobSkill(jobSkill);
        });

        return JobPostDTO.fromEntity(jobPostRepository.save(jobPost));
    }

    @Transactional
    public JobPostDTO updateJobPost(Long companyId, Long postId, JobPostRequest request, String username) {
        JobPost jobPost = jobPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found"));

        if (!companySecurity.isCompanyAdmin(companyId, username)) {
            throw new UnauthorizedException("Only company admins can update job posts");
        }

        // Validate skills exist
        Set<Long> skillIds = request.getSkills().stream()
                .map(JobSkillRequest::getSkillId)
                .collect(Collectors.toSet());

        List<Skill> skills = skillRepository.findAllBySkillIdIn(skillIds);
        if (skills.size() != skillIds.size()) {
            throw new ResourceNotFoundException("One or more skills not found");
        }

        // Update fields
        jobPost.setJobTitle(request.getJobTitle());
        jobPost.setJobDescription(request.getJobDescription());
        jobPost.setRequirements(request.getRequirements());
        jobPost.setLowerSalary(request.getLowerSalary());
        jobPost.setUpperSalary(request.getUpperSalary());
        jobPost.setLocation(request.getLocation());
        jobPost.setJobType(request.getJobType());
        jobPost.setJobCategory(request.getJobCategory());
        jobPost.setApplicationDeadline(request.getApplicationDeadline());

        // Update skills
        jobPost.getJobSkills().clear();
        request.getSkills().forEach(skillReq -> {
            Skill skill = skills.stream()
                    .filter(s -> s.getSkillId().equals(skillReq.getSkillId()))
                    .findFirst()
                    .orElseThrow();

            JobSkill jobSkill = new JobSkill();
            jobSkill.setSkill(skill);
            jobSkill.setProficiencyLevel(skillReq.getProficiencyLevel());
            jobPost.addJobSkill(jobSkill);
        });

        return JobPostDTO.fromEntity(jobPostRepository.save(jobPost));
    }

    public void deleteJobPost(Long companyId, Long postId, String username) {
        JobPost jobPost = jobPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found"));

        if (!companySecurity.isCompanyAdmin(companyId, username)) {
            throw new UnauthorizedException("Only company admins can delete job posts");
        }

        jobPostRepository.delete(jobPost);
    }

    public List<JobPostDTO> getCompanyJobPosts(Long companyId) {
        return jobPostRepository.findByCompanyId(companyId).stream()
                .map(JobPostDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<JobPostDTO> getAllPublicJobPosts() {
        return jobPostRepository.findAllByStatus(JobPost.Status.OPEN).stream()
                .map(JobPostDTO::fromEntity)
                .collect(Collectors.toList());
    }
}