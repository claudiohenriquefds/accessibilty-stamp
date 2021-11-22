package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.QueueEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.repository.QueueRepository;
import com.accessibility.stamp.repository.SiteRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/evaluate")
public class EvaluateController {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private QueueRepository queueRepository;

    //@Scheduled(fixedRate = 60*60*24000000)// every 24 hours 86400000000 milliseconds
    @GetMapping
    public String evalue() throws JSONException {
        List<SiteEntity> siteList = siteRepository.findAll();

        if(siteList.toArray().length > 0){
            for (int i = 0; i < siteList.toArray().length; i++){
                QueueEntity queueEntityVerify = queueRepository.findByUrl(siteList.get(i).getUrl());
                if(queueEntityVerify == null) {
                    QueueEntity queueEntity = new QueueEntity();
                    queueEntity.setUrl(siteList.get(i).getUrl());
                    queueRepository.save(queueEntity);
                }else{
                    queueEntityVerify.setRun(true);
                    queueRepository.save(queueEntityVerify);
                }

                siteList.get(i).setRunSubsites(true);
                siteRepository.save(siteList.get(i));
            }
            JSONObject response = new JSONObject();
            response.put("success", true);
            return response.toString();
        }

        JSONObject response = new JSONObject();
        response.put("success", false);
        response.put("message", "No have sites to evaluate.");
        return response.toString();
    }
}
