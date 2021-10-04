package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.DetailElementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailElementRepository extends JpaRepository<DetailElementEntity, Long> {
    List<DetailElementEntity> findDetailElementByDetailId(Long detailId);
}
