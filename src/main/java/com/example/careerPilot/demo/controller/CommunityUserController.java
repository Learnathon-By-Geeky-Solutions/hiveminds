package com.example.careerPilot.demo.controller;

import com.example.careerPilot.demo.Reponse.ApiResponse;
import com.example.careerPilot.demo.entity.Community;
import com.example.careerPilot.demo.entity.CommunityUser;
import com.example.careerPilot.demo.entity.User;
import com.example.careerPilot.demo.repository.CommunityRepository;
import com.example.careerPilot.demo.repository.CommunityUserRepository;
import com.example.careerPilot.demo.repository.userRepository;
import com.example.careerPilot.demo.service.CommunityUserService;
import com.example.careerPilot.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityUserController {
    @Autowired
    private final CommunityUserService communityUserService;
    @Autowired
    private final userRepository userRepository;
    @Autowired
    private final CommunityRepository communityRepository;
    @Autowired
    private final CommunityUserRepository communityUserRepository;

    //send request /api/community/request/{id}?communityId=x
    @PostMapping("/request/{userId}")
    @PreAuthorize("isAuthenticated()")
    public String sendRequest(@PathVariable Long userId, @RequestParam Long communityId) {
        communityUserService.sendRequest(userId,communityId);
        return "successfully sent request";
    }
    // accept request /api/community/accept/{id}
    @PostMapping("/accept/{requestId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> acceptRequest(@PathVariable Long requestId) {
        communityUserService.acceptRequest(requestId);
        ApiResponse apiResponse = new ApiResponse("Accepted", Map.of("requestId", requestId));
        return ResponseEntity.ok(apiResponse);
    }

    // add moderator api/community/addMod/id?communityId=
    @PostMapping("/addMod/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> addMod(
            @PathVariable Long userId,
            @RequestParam Long communityId,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        //get authUser and Community
        User authUser = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        //find the entry from UserCommunity Table
        CommunityUser entry = communityUserRepository.findByUserAndCommunity(authUser,community);

        if(entry.getRole() == CommunityUser.role.MEMBER ) {
            ApiResponse apiResponse = new ApiResponse(authUser.getUsername() +"has no permission ", Map.of("requestId", userId));
            return ResponseEntity.ok(apiResponse);
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        communityUserService.addMod(userId,communityId);
        ApiResponse apiResponse = new ApiResponse(user.getUsername() +" has been made Moderator", Map.of("requestId", userId));
        return ResponseEntity.ok(apiResponse);
    }

}
