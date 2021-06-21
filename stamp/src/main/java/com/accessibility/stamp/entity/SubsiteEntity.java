package com.accessibility.stamp.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "sub_sites")
public class SubsiteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long siteId;
    private String url;
    private Integer validations = 0;
    private String lastScore;
}
