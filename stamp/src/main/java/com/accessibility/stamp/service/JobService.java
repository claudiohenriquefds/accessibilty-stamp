package com.accessibility.stamp.service;

import com.accessibility.stamp.entity.LogsEntity;
import com.accessibility.stamp.entity.QueueEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.repository.LogsRepository;
import com.accessibility.stamp.repository.QueueRepository;
import com.accessibility.stamp.repository.SiteRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private LogsRepository logsRepository;

    @Async
    @Scheduled(fixedRate = 60000)
    public void runJob() throws JSONException, IOException {
        List<QueueEntity> queues = queueRepository.findAll();

        AccessMonitorService accessMonitorService = new AccessMonitorService();

        for(int i = 0; i < queues.toArray().length; i++){
            LogsEntity logsEntity = new LogsEntity();
            System.out.println(queues.get(i).getUrl());
            String resultValidation = accessMonitorService.getValidation(queues.get(i).getUrl()).toString();

            JSONObject validation = new JSONObject(resultValidation);
            JSONObject result = new JSONObject(validation.getString("result"));
            JSONObject data = new JSONObject(result.getString("data"));

            logsEntity.setSiteId(queues.get(i).getId());
            logsEntity.setScore(data.getString("score"));
            logsEntity.setLogs(resultValidation);
            logsRepository.save(logsEntity);

            SiteEntity siteEntity = siteRepository.findByUrl(queues.get(i).getUrl());

            siteEntity.setLast_score(data.getString("score"));
            siteEntity.setValidations(siteEntity.getValidations() + 1);
            siteRepository.save(siteEntity);

            queueRepository.delete(queues.get(i));
        }
    }
}
