package com.example.careerPilot.demo.repository;

import com.example.careerPilot.demo.entity.Community;
import com.example.careerPilot.demo.entity.CommunityUser;
import com.example.careerPilot.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityUserRepository extends JpaRepository<CommunityUser, Long> {
    CommunityUser findByUserAndCommunity(User user , Community community);
}
