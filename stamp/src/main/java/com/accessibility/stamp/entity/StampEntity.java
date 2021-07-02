package com.accessibility.stamp.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "stamps")
public class StampEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer stampLevel;

    @Column(columnDefinition = "TEXT")
    private String image;
}
