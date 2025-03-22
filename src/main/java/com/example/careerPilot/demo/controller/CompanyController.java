// CompanyController.java
package com.example.careerPilot.demo.controller;

import com.example.careerPilot.demo.dto.CompanyDTO;
import com.example.careerPilot.demo.dto.CompanyRequest;
import com.example.careerPilot.demo.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyDTO> createCompany(
            @Valid @RequestBody CompanyRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        CompanyDTO company = companyService.createCompany(request, userDetails.getUsername());
        return new ResponseEntity<>(company, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("@companySecurity.isCompanyAdmin(#id, #userDetails.username)")
    public ResponseEntity<CompanyDTO> updateCompany(
            @PathVariable Long id,
            @Valid @RequestBody CompanyRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(companyService.updateCompany(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@companySecurity.isCompanyAdmin(#id, #userDetails.username)")
    public ResponseEntity<Void> deleteCompany(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompanyById(id));
    }
}
