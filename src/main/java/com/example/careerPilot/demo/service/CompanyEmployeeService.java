//package com.example.careerPilot.demo.service;
//
//import com.example.careerPilot.demo.dto.CompanyEmployeeDTO;
//import com.example.careerPilot.demo.entity.Company;
//import com.example.careerPilot.demo.entity.CompanyEmployee;
//import com.example.careerPilot.demo.entity.User;
//import com.example.careerPilot.demo.exception.ResourceNotFoundException;
//import com.example.careerPilot.demo.exception.UnauthorizedException;
//import com.example.careerPilot.demo.repository.CompanyEmployeeRepository;
//import com.example.careerPilot.demo.repository.CompanyRepository;
//import com.example.careerPilot.demo.repository.userRepository;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class CompanyEmployeeService {
//    private final CompanyRepository companyRepository;
//    private final userRepository userRepository;
//    private final CompanyEmployeeRepository companyEmployeeRepository;
//
//    @Transactional
//    public CompanyEmployeeDTO.Response addEmployeeToCompany(
//            Long companyId,
//            CompanyEmployeeDTO.Request request,
//            Long currentUserId
//    ) {
//        // Check if user making the request is an admin
//        boolean isAdmin = companyEmployeeRepository.findByCompanyIdAndUserIdAndRole(
//                companyId, currentUserId, CompanyEmployee.Role.ADMIN).isPresent();
//
//        if (!isAdmin) {
//            throw new UnauthorizedException("Only company admins can add employees");
//        }
//
//        // Find company and user to be added
//        Company company = companyRepository.findById(companyId)
//                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + companyId));
//
//        User userToAdd = userRepository.findById(request.getUserId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));
//
//        // Check if user is already an employee of the company
//        if (companyEmployeeRepository.findByCompanyIdAndUserId(companyId, request.getUserId()).isPresent()) {
//            throw new IllegalStateException("User is already an employee of this company");
//        }
//
//        CompanyEmployee companyEmployee = CompanyEmployee.builder()
//                .user(userToAdd)
//                .company(company)
//                .hiringDate(request.getHiringDate())
//                .status(CompanyEmployee.Status.ACTIVE)
//                .role(request.getRole())
//                .jobTitle(request.getJobTitle())
//                .build();
//
//        CompanyEmployee savedEmployee = companyEmployeeRepository.save(companyEmployee);
//
//        // Update employee count
//        company.setNoOfEmployee(company.getNoOfEmployee() + 1);
//        companyRepository.save(company);
//
//        return CompanyEmployeeDTO.Response.fromEntity(savedEmployee);
//    }
//
//    public List<CompanyEmployeeDTO.Response> getCompanyEmployees(Long companyId, Long currentUserId) {
//        // Check if company exists
//        if (!companyRepository.existsById(companyId)) {
//            throw new ResourceNotFoundException("Company not found with id: " + companyId);
//        }
//
//        // Check if user has access to view employees (either an employee of the company or admin)
//        boolean hasAccess = companyEmployeeRepository.findByCompanyIdAndUserId(companyId, currentUserId).isPresent();
//
//        if (!hasAccess) {
//            throw new UnauthorizedException("You don't have permission to view company employees");
//        }
//
//        return companyEmployeeRepository.findByCompanyId(companyId).stream()
//                .map(CompanyEmployeeDTO.Response::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public CompanyEmployeeDTO.Response updateEmployeeStatus(
//            Long employeeId,
//            CompanyEmployee.Status status,
//            Long currentUserId
//    ) {
//        CompanyEmployee employee = companyEmployeeRepository.findById(employeeId)
//                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
//
//        Long companyId = employee.getCompany().getId();
//
//        // Check if user making the request is an admin
//        boolean isAdmin = companyEmployeeRepository.findByCompanyIdAndUserIdAndRole(
//                companyId, currentUserId, CompanyEmployee.Role.ADMIN).isPresent();
//
//        if (!isAdmin) {
//            throw new UnauthorizedException("Only company admins can update employee status");
//        }
//
//        // Don't allow admins to be inactivated or terminated by other admins
//        if (employee.getRole() == CompanyEmployee.Role.ADMIN &&
//                (status == CompanyEmployee.Status.INACTIVE || status == CompanyEmployee.Status.TERMINATED)) {
//            throw new UnauthorizedException("Cannot change status of another admin");
//        }
//
//        employee.setStatus(status);
//
//        if (status == CompanyEmployee.Status.TERMINATED) {
//            employee.setReleasedAt(LocalDateTime.now());
//
//            // Update employee count
//            Company company = employee.getCompany();
//            company.setNoOfEmployee(company.getNoOfEmployee() - 1);
//            companyRepository.save(company);
//        }
//
//        CompanyEmployee updatedEmployee = companyEmployeeRepository.save(employee);
//        return CompanyEmployeeDTO.Response.fromEntity(updatedEmployee);
//    }
//}