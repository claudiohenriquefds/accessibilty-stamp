package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.LogsEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.repository.SiteRepository;
import com.accessibility.stamp.service.AccessMonitorService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.json.JSONObject;

import java.io.IOException;

@RestController
@RequestMapping("/site")
public class SiteController {

    @Autowired
    private SiteRepository siteRepository;

    @PostMapping("/save")
    public boolean post(@RequestBody String url) throws JSONException, IOException {
//        JSONObject json = new JSONObject(url);
//
//        SiteEntity site = new SiteEntity();
//        LogsEntity logs = new LogsEntity();
//
//        AccessMonitorService accessMonitorService = new AccessMonitorService();
//
//        site.setUrl(json.get("site").toString());
//
//        String resultValidation = accessMonitorService.getValidation(site.getSite()).toString();
//        logs.setLogs(resultValidation);
//        JSONObject validation = new JSONObject(resultValidation);
//        JSONObject result = new JSONObject(validation.getString("result"));
//        JSONObject data = new JSONObject(result.getString("data"));
//
//        site.setLast_score(data.getString("score"));
//        site.setValidations(1);
//        SiteEntity returnSaveSite = siteRepository.save(site);
//
//        if(returnSaveSite.getSite() != null){
//            return true;
//        }

        return false;
    }

}
