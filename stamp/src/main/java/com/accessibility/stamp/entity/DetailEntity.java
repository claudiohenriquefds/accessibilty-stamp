package com.accessibility.stamp.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "details")
public class DetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long siteId;
    private Boolean subsite = null;
    private String url;
    private String element;
    private String veredict;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "detailEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetailElementEntity> detailElementEntities;
}
