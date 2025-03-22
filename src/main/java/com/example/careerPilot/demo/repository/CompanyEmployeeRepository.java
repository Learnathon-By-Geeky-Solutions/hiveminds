package com.example.careerPilot.demo.repository;

import com.example.careerPilot.demo.entity.Company;
import com.example.careerPilot.demo.entity.CompanyEmployee;
import com.example.careerPilot.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyEmployeeRepository extends JpaRepository<CompanyEmployee, Long> {
    boolean existsByUserAndCompany(User user, Company company);
    boolean existsByCompanyIdAndUserUsernameAndRole(Long companyId, String username, CompanyEmployee.Role role);
}