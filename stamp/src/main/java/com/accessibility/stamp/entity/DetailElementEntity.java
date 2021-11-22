package com.accessibility.stamp.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "detail_elements")
public class DetailElementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "detail_id")
    private DetailEntity detailEntity;

    @Column(columnDefinition = "TEXT")
    private String pointer;

    @Column(columnDefinition = "TEXT")
    private String htmlCode;
}
