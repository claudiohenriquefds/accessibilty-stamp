package com.accessibility.stamp.entity;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "logs")
public class LogsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String logs;

}
