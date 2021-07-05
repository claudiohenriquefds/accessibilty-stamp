package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.*;
import com.accessibility.stamp.repository.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/data")
public class DataController {
    @Autowired
    private LogsRepository logsRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private SubsiteRepository subsiteRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public String post(@RequestBody String bodyResquest, @RequestHeader("Authorization") String authorization) throws JSONException {
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        JSONObject body = new JSONObject(bodyResquest);
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONArray jsonDataMonth = new JSONArray();
            JSONArray jsonDataYear = new JSONArray();
            JSONObject jsonDataStructure = new JSONObject();

            Date date = new Date();
            LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            SiteEntity siteEntity = siteRepository.findSiteEntityByIdAndUserId(Long.parseLong(body.get("id").toString()), userEntity.getId());
            List<HistoryEntity> historyListMonth = historyRepository.findBySiteIdAndAndCreatedAt_Month(Long.parseLong(body.get("id").toString()), localDate.getMonthValue());
            List<HistoryEntity> historyListYear = historyRepository.findAllUsingRawQuery(Long.parseLong(body.get("id").toString()));
            List<SubsiteEntity> subsiteEntityList = subsiteRepository.findBySiteId(siteEntity.getId());

            jsonDataStructure.put("validations", siteEntity.getValidations());
            jsonDataStructure.put("average", siteEntity.getAverage());
            jsonDataStructure.put("last_score", siteEntity.getLastScore());
            jsonDataStructure.put("subpages_quantity", subsiteEntityList.toArray().length);

            for(int i = 0; i < historyListMonth.toArray().length; i++){
                JSONObject jsonDataHistory = new JSONObject();

                jsonDataHistory.put("name", siteEntity.getName());
                jsonDataHistory.put("url", siteEntity.getUrl());
                jsonDataHistory.put("last_score", historyListMonth.get(i).getScore());
                jsonDataHistory.put("average", historyListMonth.get(i).getScore());
                jsonDataHistory.put("status", historyListMonth.get(i).getStatus());
                jsonDataHistory.put("date", historyListMonth.get(i).getCreatedAt());
                jsonDataMonth.put(jsonDataHistory);
            }

            jsonDataStructure.put("history_month", jsonDataMonth);

            for(int i = 0; i < historyListYear.toArray().length; i++){
                JSONObject jsonDataHistory = new JSONObject();

                jsonDataHistory.put("average", historyListYear.get(i).getAverage());
                jsonDataHistory.put("date", historyListYear.get(i).getCreatedAt());
                jsonDataYear.put(jsonDataHistory);
            }

            jsonDataStructure.put("history_year", jsonDataYear);

            jsonResponse.put("success", true);
            jsonResponse.put("data", jsonDataStructure);
            jsonResponse.put("errors", null);
        }catch(JSONException e){
            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", e);
        }


        return jsonResponse.toString();
    }
}
