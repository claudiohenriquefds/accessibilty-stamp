package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.DetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailRepository extends JpaRepository<DetailEntity, Long> {
    List<DetailEntity> findDetailBySiteId(Long siteId);
    List<DetailEntity> findDetailByUrlAndSiteId(String url, Long siteId);
    List<DetailEntity> findDetailBySiteIdAndVeredict(Long siteId, String veredict);
}
