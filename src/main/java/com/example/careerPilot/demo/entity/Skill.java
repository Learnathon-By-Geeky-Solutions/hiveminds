package com.example.careerPilot.demo.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "skills"
)
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;
    @NonNull
    @Column(name = "skillName" , nullable = false)
    private String skillName;

}
