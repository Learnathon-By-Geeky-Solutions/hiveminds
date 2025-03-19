package com.example.careerPilot.demo.controller;

import com.example.careerPilot.demo.dto.CommunityDTO;
import com.example.careerPilot.demo.entity.Community;
import com.example.careerPilot.demo.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
//GET /api/community?page=0&size=10&sort=name,asc
public class CommunityController {
    private final CommunityService communityService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public Page<CommunityDTO> getAllCommunities(Pageable pageable) {
        return communityService.getCommunities(pageable);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping()
    public ResponseEntity<Community> createCommunity (@RequestBody CommunityDTO communityDTO,
                                                      @RequestParam Long userId )
    {
        Community community = communityService.createCommunity(communityDTO, userId);
        return ResponseEntity.status(201).body(community);
    }

}
