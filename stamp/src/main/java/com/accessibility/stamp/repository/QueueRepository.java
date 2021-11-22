package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.QueueEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueueRepository extends JpaRepository<QueueEntity, Long> {
    List<QueueEntity> findByRun(Boolean run);

    QueueEntity findByUrl(String url);
}
