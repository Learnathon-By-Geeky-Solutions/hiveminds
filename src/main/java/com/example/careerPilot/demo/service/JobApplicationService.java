//package com.example.careerPilot.demo.service;
//
//import com.example.careerPilot.demo.dto.JobApplicationDTO;
//import com.example.careerPilot.demo.entity.*;
//import com.example.careerPilot.demo.exception.BadRequestException;
//import com.example.careerPilot.demo.exception.ResourceNotFoundException;
//import com.example.careerPilot.demo.exception.UnauthorizedException;
//import com.example.careerPilot.demo.repository.*;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class JobApplicationService {
//    private final JobApplicationRepository jobApplicationRepository;
//    private final JobPostRepository jobPostRepository;
//    private final userRepository userRepository;
//    private final CompanyEmployeeRepository companyEmployeeRepository;
//    private final CompanyRepository companyRepository;
//
//    @Transactional
//    public JobApplicationDTO.Response applyForJob(Long jobPostId, JobApplicationDTO.Request request, Long currentUserId) {
//        // Check if the job post exists and is open
//        JobPost jobPost = jobPostRepository.findById(jobPostId)
//                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + jobPostId));
//
//        if (jobPost.getStatus() != JobPost.Status.OPEN) {
//            throw new BadRequestException("This job posting is no longer accepting applications");
//        }
//
//        // Check if application deadline has passed
//        if (jobPost.getApplicationDeadline() != null &&
//                jobPost.getApplicationDeadline().isBefore(java.time.LocalDate.now())) {
//            throw new BadRequestException("The application deadline for this job has passed");
//        }
//
//        // Check if user already applied
//        if (jobApplicationRepository.findByJobPostIdAndApplicantId(jobPostId, currentUserId).isPresent()) {
//            throw new BadRequestException("You have already applied for this job");
//        }
//
//        // Check if user is already an employee of the company
//        if (companyEmployeeRepository.findByCompanyIdAndUserId(jobPost.getCompany().getId(), currentUserId).isPresent()) {
//            throw new BadRequestException("You are already an employee of this company");
//        }
//
//        User applicant = userRepository.findById(currentUserId)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + currentUserId));
//
//        JobApplication application = JobApplication.builder()
//                .applicant(applicant)
//                .jobPost(jobPost)
//                .status(JobApplication.Status.PENDING)
//                .coverLetter(request.getCoverLetter())
//                .build();
//
//        JobApplication savedApplication = jobApplicationRepository.save(application);
//        return JobApplicationDTO.Response.fromEntity(savedApplication);
//    }
//
//    public List<JobApplicationDTO.Response> getUserApplications(Long currentUserId) {
//        return jobApplicationRepository.findByApplicantId(currentUserId).stream()
//                .map(JobApplicationDTO.Response::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    public List<JobApplicationDTO.Response> getCompanyApplications(Long companyId, Long currentUserId) {
//        // Check if company exists
//        if (!companyRepository.existsById(companyId)) {
//            throw new ResourceNotFoundException("Company not found with id: " + companyId);
//        }
//
//        // Check if user has permission (Admin or Moderator)
//        Optional<CompanyEmployee> employeeOpt = companyEmployeeRepository.findByCompanyIdAndUserId(companyId, currentUserId);
//
//        if (employeeOpt.isEmpty() ||
//                (employeeOpt.get().getRole() != CompanyEmployee.Role.ADMIN &&
//                        employeeOpt.get().getRole() != CompanyEmployee.Role.MODERATOR)) {
//            throw new UnauthorizedException("Only admins and moderators can view applications");
//        }
//
//        return jobApplicationRepository.findByCompanyId(companyId).stream()
//                .map(JobApplicationDTO.Response::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    public List<JobApplicationDTO.Response> getJobPostApplications(Long jobPostId, Long currentUserId) {
//        // Check if job post exists
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
//            throw new UnauthorizedException("Only admins and moderators can view applications");
//        }
//
//        return jobApplicationRepository.findByJobPostId(jobPostId).stream()
//                .map(JobApplicationDTO.Response::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public JobApplicationDTO.Response updateApplicationStatus(
//            Long applicationId,
//            JobApplicationDTO.StatusUpdateRequest request,
//            Long currentUserId
//    ) {
//        JobApplication application = jobApplicationRepository.findById(applicationId)
//                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));
//
//        Long companyId = application.getJobPost().getCompany().getId();
//
//        // Check if user has permission (Admin or Moderator)
//        Optional<CompanyEmployee> employeeOpt = companyEmployeeRepository.findByCompanyIdAndUserId(companyId, currentUserId);
//
//        if (employeeOpt.isEmpty() ||
//                (employeeOpt.get().getRole() != CompanyEmployee.Role.ADMIN &&
//                        employeeOpt.get().getRole() != CompanyEmployee.Role.MODERATOR)) {
//            throw new UnauthorizedException("Only admins and moderators can update application status");
//        }
//
//        application.setStatus(request.getStatus());
//        JobApplication updatedApplication = jobApplicationRepository.save(application);
//
//        // If application is approved, create a company employee entry
//        if (request.getStatus() == JobApplication.Status.APPROVED) {
//            createCompanyEmployeeFromApplication(application);
//        }
//
//        return JobApplicationDTO.Response.fromEntity(updatedApplication);
//    }
//
//    private void createCompanyEmployeeFromApplication(JobApplication application) {
//        // Check if the user is already an employee
//        if (companyEmployeeRepository.findByCompanyIdAndUserId(
//                application.getJobPost().getCompany().getId(),
//                application.getApplicant().getId()
//        ).isPresent()) {
//            return; // User is already an employee, do nothing
//        }
//
//        CompanyEmployee newEmployee = CompanyEmployee.builder()
//                .user(application.getApplicant())
//                .company(application.getJobPost().getCompany())
//                .hiringDate(LocalDateTime.now())
//                .status(CompanyEmployee.Status.ACTIVE)
//                .role(CompanyEmployee.Role.EMPLOYEE)
//                .jobTitle(application.getJobPost().getJobTitle())
//                .build();
//
//        companyEmployeeRepository.save(newEmployee);
//
//        // Update employee count
//        Company company = application.getJobPost().getCompany();
//        company.setNoOfEmployee(company.getNoOfEmployee() + 1);
//        companyRepository.save(company);
//    }
//}