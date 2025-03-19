package com.example.careerPilot.demo.dto;

import lombok.Data;

@Data
public class CommunityDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String visibility;
}