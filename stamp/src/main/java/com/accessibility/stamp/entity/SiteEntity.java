package com.accessibility.stamp.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "sites")
public class SiteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String site;
    private Integer validations;
    private String last_score;
}
