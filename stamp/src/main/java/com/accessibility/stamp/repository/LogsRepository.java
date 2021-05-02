package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.LogsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogsRepository extends JpaRepository<LogsEntity, Long> {

}
