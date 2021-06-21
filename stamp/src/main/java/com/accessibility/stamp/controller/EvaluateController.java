package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.QueueEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.repository.QueueRepository;
import com.accessibility.stamp.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EvaluateController {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private QueueRepository queueRepository;

    @Scheduled(fixedRate = 60*60*24000000)// every 24 hours 86400000000 milliseconds
    public boolean evalue(){
        List<SiteEntity> sites = siteRepository.findAll();

        for (int i = 0; i < sites.toArray().length; i++){
            QueueEntity queueEntityVerify = queueRepository.findByUrl(sites.get(i).getUrl());
            if(queueEntityVerify == null) {
                QueueEntity queueEntity = new QueueEntity();
                queueEntity.setUrl(sites.get(i).getUrl());
                queueRepository.save(queueEntity);
            }else{
                queueEntityVerify.setRun(true);
                queueRepository.save(queueEntityVerify);
            }

            sites.get(i).setRunSubsites(true);
            siteRepository.save(sites.get(i));
        }

        return true;
    }
}
