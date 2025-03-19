package com.example.careerPilot.demo.service;

import com.example.careerPilot.demo.dto.CommunityDTO;
import com.example.careerPilot.demo.entity.Community;
import com.example.careerPilot.demo.entity.User;
import com.example.careerPilot.demo.repository.CommunityRepository;
import com.example.careerPilot.demo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommunityService {
    @Autowired
    private final CommunityRepository communityRepository;
    @Autowired
    private final userRepository userRepository;

    public CommunityService(CommunityRepository communityRepository, userRepository userRepository) {
        this.communityRepository = communityRepository;
        this.userRepository = userRepository;
    }

    public Page<CommunityDTO> getCommunities(Pageable pageable) {
        return communityRepository.findAll(pageable).map(this::mapToDTO);
    }

    public Community createCommunity(@RequestBody CommunityDTO communityDTO, @RequestBody Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Community community = new Community();
        community.setName(communityDTO.getName());
        community.setDescription(communityDTO.getDescription());
        community.setCategory(communityDTO.getCategory());
        community.setCreatedBy(user);
        if (communityDTO.getVisibility() != null) {
            community.setVisibility(Community.Visibility.valueOf(communityDTO.getVisibility().toUpperCase()));
        }
        return communityRepository.save(community);

    }

    private CommunityDTO mapToDTO(Community community) {
        CommunityDTO dto = new CommunityDTO();
        dto.setId(community.getId());
        dto.setName(community.getName());
        dto.setDescription(community.getDescription());
        dto.setCategory(community.getCategory());
        dto.setVisibility(community.getVisibility().toString()); // Enum as string
        return dto;
    }


}
