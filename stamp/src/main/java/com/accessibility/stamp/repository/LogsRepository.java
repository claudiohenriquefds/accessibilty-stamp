package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.LogsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogsRepository extends JpaRepository<LogsEntity, Long> {
    List<LogsEntity> findLogsEntitiesBySiteIdAndSubsite(Long siteId, Boolean subsite);
}
