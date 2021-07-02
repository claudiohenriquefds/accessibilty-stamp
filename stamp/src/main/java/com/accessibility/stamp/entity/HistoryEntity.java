package com.accessibility.stamp.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "history")
public class HistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long siteId;
    private String score = null;
    private Double average = null;
    private Integer status = null;

    @CreationTimestamp
    private Date createdAt;
}
