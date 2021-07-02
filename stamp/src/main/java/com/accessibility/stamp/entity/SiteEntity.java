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
    private String lastScore;
    private Double average = 0.00;
    private Integer stampLevel;
    private Boolean runSubsites = true;
}
