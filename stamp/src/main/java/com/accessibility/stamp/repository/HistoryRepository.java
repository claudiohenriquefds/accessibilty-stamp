package com.accessibility.stamp.repository;

import com.accessibility.stamp.entity.HistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Long> {
    @Query(value = "SELECT * FROM history WHERE site_id = ?1 AND DATE_FORMAT(created_at, '%m') = ?2", nativeQuery = true)
    List<HistoryEntity> findBySiteIdAndAndCreatedAt_Month(Long siteId, Integer month);

    @Query(value = "SELECT  1 AS id, 1 AS score, 1 AS site_id, 1 AS status, history_data.average, concat('2021-', history_data.created_at, '-01') as created_at FROM (SELECT  AVG(score) AS average, DATE_FORMAT(created_at, '%m') AS created_at FROM history INNER JOIN sites as s on s.id = history.site_id WHERE DATE_FORMAT(created_at, '%Y') = DATE_FORMAT(NOW(), '%Y') AND s.id = ?1 GROUP BY DATE_FORMAT(created_at, '%m')) AS history_data", nativeQuery = true)
    List<HistoryEntity> findAllUsingRawQuery(Long siteId);

    List<HistoryEntity> findBySiteId(Long siteId);

    List<HistoryEntity> findBySiteIdOrderByCreatedAt(Long siteId);
}
