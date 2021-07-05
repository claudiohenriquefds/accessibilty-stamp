package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.entity.SubsiteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubsiteRepository extends JpaRepository<SubsiteEntity, Long> {
    SubsiteEntity findSubsiteByUrl(String url);
    List<SubsiteEntity> findBySiteId(Long site_id);
}
