package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.LogsEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.repository.LogsRepository;
import com.accessibility.stamp.repository.SiteRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogController {

    @Autowired
    private LogsRepository logsRepository;

    @Autowired
    private SiteRepository siteRepository;

    @GetMapping("/get")
    public String logs(@RequestBody String data) throws JSONException {
        JSONObject dataBody = new JSONObject(data);
        List<LogsEntity> logsEntityList = logsRepository.findLogsEntitiesBySiteIdAndSubsite(Long.parseLong(dataBody.get("id").toString()), false);
        JSONArray result = new JSONArray();

        for(int i = 0; i < logsEntityList.toArray().length; i++){
            JSONObject json = new JSONObject();
            SiteEntity siteEntity = siteRepository.findSiteEntityById(logsEntityList.get(i).getSiteId());
            if(siteEntity != null){
                json.put("name", siteEntity.getName());
                json.put("url", siteEntity.getUrl());
                json.put("last_score", logsEntityList.get(i).getScore());
                json.put("status", logsEntityList.get(i).getStatus());
                json.put("date", logsEntityList.get(i).getCreatedAt());
                result.put(json);
            }
        }
        return result.toString();
    }
}
