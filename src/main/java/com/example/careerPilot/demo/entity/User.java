package com.example.careerPilot.demo.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "User name is required")
    @Column( name="user_name" , unique = true, nullable = false)
    private String username;

    @Nullable
    @NotEmpty(message = "first name is required")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Nullable
    @NotEmpty(message = "last name is required")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Email(message = "Input valid email")
    @NotEmpty(message = "Email is required")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Size( min = 8, message = "8 character long")
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "country")
    private String country;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "experience_years", columnDefinition = "int default 0")
    private Integer experienceYears;

    @Column(name = "industry")
    private String industry;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability_status", columnDefinition = "enum('available', 'busy', 'on_leave') default 'available'")
    private AvailabilityStatus availabilityStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "role" , columnDefinition = "enum('USER','ADMIN') default 'USER'")
    ROLE role;

    @Column(name = "preferred_working_hours")
    private String preferredWorkingHours;

    @Column(name = "performance_rating", precision = 3, scale = 2, columnDefinition = "decimal(3,2) default NULL")
    private BigDecimal performanceRating;

    @Column(name = "last_evaluation_date")
    private LocalDate lastEvaluationDate;

    @Column(name = "completed_projects", columnDefinition = "int default 0")
    private Integer completedProjects;

    @Column(name = "ongoing_projects", columnDefinition = "int default 0")
    private Integer ongoingProjects;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_status", columnDefinition = "enum('active', 'inactive', 'suspended') default 'active'")
    private AccountStatus accountStatus;

    @Column(name = "language", columnDefinition = "varchar(255) default 'en'")
    private String language;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of( new SimpleGrantedAuthority( role.name() ));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public enum AvailabilityStatus {
        AVAILABLE,
        BUSY,
        ON_LEAVE
    }

    public enum AccountStatus {
        ACTIVE,
        INACTIVE,
        SUSPENDED
    }
    public enum ROLE {
        USER,
        ADMIN
    }


    // one to many relationship with post
    @OneToMany(
            cascade = CascadeType.ALL

    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "id"
    )
    private List<Post> posts;
}

