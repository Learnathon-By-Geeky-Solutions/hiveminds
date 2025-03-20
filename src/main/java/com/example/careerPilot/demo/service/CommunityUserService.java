package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.entity.Community;
import com.example.careerPilot.demo.entity.CommunityUser;
import com.example.careerPilot.demo.entity.User;
import com.example.careerPilot.demo.repository.CommunityRepository;
import com.example.careerPilot.demo.repository.CommunityUserRepository;
import com.example.careerPilot.demo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class CommunityUserService {
    @Autowired
    private final CommunityUserRepository communityUserRepository;
    @Autowired
    private final CommunityRepository communityRepository;
    @Autowired
    private final UserService userService;
    @Autowired
    private final userRepository userRepository;

    public CommunityUserService(CommunityUserRepository communityUserRepository, CommunityRepository communityRepository, UserService userService, userRepository userRepository) {
        this.communityUserRepository = communityUserRepository;
        this.communityRepository = communityRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public boolean sendRequest(Long userId, Long communityId) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        if(communityUserRepository.findByUserAndCommunity(user,community)!=null) {
            return false;
        }

        CommunityUser communityUser = new CommunityUser();
        communityUser.setUser(user);
        communityUser.setCommunity(community);
        communityUser.setStatus(CommunityUser.status.PENDING);
        communityUser.setRole(CommunityUser.role.MEMBER);
        communityUserRepository.save(communityUser);
        return true;
    }

    public void acceptRequest(Long requestId) {
        CommunityUser communityUser = communityUserRepository.findById(requestId).orElseThrow(()->new RuntimeException("Request not found"));
        communityUser.setStatus(CommunityUser.status.ACCEPTED);
        communityUserRepository.save(communityUser);
    }

    public void addMod(Long userId, Long communityId) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        CommunityUser communityUser = communityUserRepository.findByUserAndCommunity(user, community);
        communityUser.setRole(CommunityUser.role.MODERATOR);
        communityUserRepository.save(communityUser);
    }
    public void addAdmin(Long userId, Long communityId) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        CommunityUser communityUser = communityUserRepository.findByUserAndCommunity(user, community);
        communityUser.setRole(CommunityUser.role.ADMIN);
        communityUserRepository.save(communityUser);
    }

    public void removeUser(Long userId, Long communityId, UserDetails userDetails) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        CommunityUser communityUser = communityUserRepository.findByUserAndCommunity(user, community);
        communityUserRepository.delete(communityUser);
    }
}
