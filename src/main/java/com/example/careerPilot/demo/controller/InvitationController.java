
package com.example.careerPilot.demo.controller;

import com.example.careerPilot.demo.dto.InvitationDTO;
import com.example.careerPilot.demo.dto.InvitationRequest;
import com.example.careerPilot.demo.service.InvitationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invitations")
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;

    @PostMapping("/{companyId}/invite")
    @PreAuthorize("@companySecurity.isCompanyAdmin(#companyId, #userDetails.username)")
    public ResponseEntity<InvitationDTO> sendInvitation(
            @PathVariable Long companyId,
            @Valid @RequestBody InvitationRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(
                invitationService.createInvitation(companyId, request, userDetails.getUsername()),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{invitationId}/accept")
    public ResponseEntity<InvitationDTO> acceptInvitation(
            @PathVariable Long invitationId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(invitationService.acceptInvitation(invitationId, userDetails.getUsername()));
    }

    @PutMapping("/{invitationId}/reject")
    public ResponseEntity<InvitationDTO> rejectInvitation(
            @PathVariable Long invitationId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(invitationService.rejectInvitation(invitationId, userDetails.getUsername()));
    }
}