package com.example.careerPilot.demo.dto;

import com.example.careerPilot.demo.entity.CompanyEmployee;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class CompanyEmployeeDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotNull(message = "User ID is required")
        private Long userId;

        @NotBlank(message = "Job title is required")
        private String jobTitle;

        @NotNull(message = "Role is required")
        private CompanyEmployee.Role role;

        private LocalDateTime hiringDate = LocalDateTime.now();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private Long userId;
        private String username;
        private Long companyId;
        private String companyName;
        private String jobTitle;
        private CompanyEmployee.Role role;
        private CompanyEmployee.Status status;
        private LocalDateTime hiringDate;
        private LocalDateTime createdAt;

        public static Response fromEntity(CompanyEmployee employee) {
            return Response.builder()
                    .id(employee.getId())
                    .userId(employee.getUser().getId())
                    .username(employee.getUser().getUsername())
                    .companyId(employee.getCompany().getId())
                    .companyName(employee.getCompany().getCompanyName())
                    .jobTitle(employee.getJobTitle())
                    .role(employee.getRole())
                    .status(employee.getStatus())
                    .hiringDate(employee.getHiringDate())
                    .createdAt(employee.getCreatedAt())
                    .build();
        }
    }
}