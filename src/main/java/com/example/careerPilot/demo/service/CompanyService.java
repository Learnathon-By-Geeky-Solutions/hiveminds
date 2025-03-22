package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.dto.CompanyDTO;
import com.example.careerPilot.demo.dto.CompanyRequest;
import com.example.careerPilot.demo.entity.*;
import com.example.careerPilot.demo.exception.CompanyNotFoundException;
import com.example.careerPilot.demo.repository.CompanyEmployeeRepository;
import com.example.careerPilot.demo.repository.CompanyRepository;
import com.example.careerPilot.demo.repository.userRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final userRepository userRepository;
    private final CompanyEmployeeRepository companyEmployeeRepository;

    @Transactional
    public CompanyDTO createCompany(CompanyRequest request, String username) {
        User creator = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = new Company();
        company.setCompanyName(request.getCompanyName());
        company.setDescriptions(request.getDescriptions());
        company.setIndustry(request.getIndustry());
        company.setLocation(request.getLocation());
        company.setContactEmail(request.getContactEmail());
        company.setCreatedBy(creator);
        company = companyRepository.save(company);

        // Add creator as admin
        CompanyEmployee adminEmployee = new CompanyEmployee();
        adminEmployee.setUser(creator);
        adminEmployee.setCompany(company);
        adminEmployee.setRole(CompanyEmployee.Role.ADMIN);
        adminEmployee.setHiringDate(LocalDateTime.now());
        adminEmployee.setStatus(CompanyEmployee.Status.ACTIVE);
        companyEmployeeRepository.save(adminEmployee);

        return CompanyDTO.fromEntity(company);
    }

    public CompanyDTO updateCompany(Long id, CompanyRequest request) {
        Company company = companyRepository.findById(id)
                .orElseThrow();

        company.setCompanyName(request.getCompanyName());
        company.setDescriptions(request.getDescriptions());
        company.setIndustry(request.getIndustry());
        company.setLocation(request.getLocation());
        company.setContactEmail(request.getContactEmail());

        return CompanyDTO.fromEntity(companyRepository.save(company));
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }

    public CompanyDTO getCompanyById(Long id) {
        return companyRepository.findById(id)
                .map(CompanyDTO::fromEntity)
                .orElseThrow();
    }
}