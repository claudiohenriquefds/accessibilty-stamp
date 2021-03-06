package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.HistoryEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.entity.UserEntity;
import com.accessibility.stamp.repository.HistoryRepository;
import com.accessibility.stamp.repository.SiteRepository;
import com.accessibility.stamp.repository.UserRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history")
public class HistoryController {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public String getHistory(@RequestBody String bodyRequest, @RequestHeader("Authorization") String authorization) throws JSONException {
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        JSONObject body = new JSONObject(bodyRequest);
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONArray jsonData = new JSONArray();
            List<HistoryEntity> historyEntityList = historyRepository.findBySiteId(Long.parseLong(body.get("id").toString()));

            for(int i = 0; i < historyEntityList.toArray().length; i++){
                SiteEntity siteEntity = siteRepository.findSiteEntityByIdAndUserId(historyEntityList.get(i).getSiteId(), userEntity.getId());
                JSONObject jsonDataHistory = new JSONObject();
                jsonDataHistory.put("url", siteEntity.getUrl());
                jsonDataHistory.put("name", siteEntity.getName());
                jsonDataHistory.put("last_score", historyEntityList.get(i).getScore());
                jsonDataHistory.put("average", historyEntityList.get(i).getAverage());
                jsonDataHistory.put("status", historyEntityList.get(i).getStatus());
                jsonDataHistory.put("date", historyEntityList.get(i).getCreatedAt());
                jsonData.put(jsonDataHistory);
            }

            jsonResponse.put("success", true);
            jsonResponse.put("data", jsonData.toString());
            jsonResponse.put("errors", null);
        }catch (Exception e){
            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", e);
        }

        return jsonResponse.toString();
    }
}
