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

    private String name;
    private String url;
    private Integer validations = 0;
    private String last_score;
    private Float stampLevel;
}
