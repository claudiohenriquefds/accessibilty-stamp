package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.SiteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SiteRepository extends JpaRepository<SiteEntity, Long> {
    SiteEntity findByUrl(String url);
    SiteEntity findSiteEntityByIdAndUserId(Long id, Long userId);
    SiteEntity findSiteEntityById(Long id);
    List<SiteEntity> findAllByUserId(Long id);
}