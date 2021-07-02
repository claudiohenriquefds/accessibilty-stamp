package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.StampEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StampRepository extends JpaRepository<StampEntity, Long> {
    StampEntity findByStampLevel(Integer stampLevel);
}
