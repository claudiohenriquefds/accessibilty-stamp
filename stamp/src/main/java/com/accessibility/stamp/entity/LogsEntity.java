package com.accessibility.stamp.entity;


import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "logs")
public class LogsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long siteId;
    private String score = null;
    private Boolean subsite = null;
    private String url;
    private Integer status;

    @CreationTimestamp
    private Date createdAt;

    @Column(columnDefinition = "TEXT")
    private String logs;

}
