package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.QueueEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.entity.StampEntity;
import com.accessibility.stamp.entity.SubsiteEntity;
import com.accessibility.stamp.repository.QueueRepository;
import com.accessibility.stamp.repository.SiteRepository;
import com.accessibility.stamp.repository.StampRepository;
import com.accessibility.stamp.repository.SubsiteRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/site")
public class SiteController {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private SubsiteRepository subsiteRepository;

    @Autowired
    private StampRepository stampRepository;

    @Autowired
    private QueueRepository queueRepository;

    @PostMapping("/store")
    public String store(@RequestBody String requestBody) throws JSONException, IOException {
        JSONObject body = new JSONObject(requestBody);
        JSONObject jsonResponse = new JSONObject();

        SiteEntity siteEntity = new SiteEntity();
        QueueEntity queueEntity = new QueueEntity();

        if(body.get("url").toString() != null){
            try{
                siteEntity.setUrl(body.get("url").toString());
                siteEntity.setName(body.get("name").toString());
                queueEntity.setUrl(body.get("url").toString());
                queueRepository.save(queueEntity);
                siteRepository.save(siteEntity);

                jsonResponse.put("success", true);
                jsonResponse.put("data", null);
                jsonResponse.put("errors", null);
            }catch(JSONException e){
                jsonResponse.put("success", false);
                jsonResponse.put("data", null);
                jsonResponse.put("errors", e);
            }
        }else{
            JSONArray errors = new JSONArray();
            errors.put("Campos obrigatórios não foram informados.");

            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", errors);
        }

        return jsonResponse.toString();
    }
    @GetMapping("/show")
    public String show() throws JSONException {
        List<SiteEntity> siteList = siteRepository.findAll();
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONArray jsonData = new JSONArray();

            for(int i = 0; i < siteList.toArray().length; i++){
                JSONObject jsonDataSite = new JSONObject();
                
                List<SubsiteEntity> subsiteEntities = subsiteRepository.findBySiteId(siteList.get(i).getId());
                StampEntity stampEntity = stampRepository.findByStampLevel(siteList.get(i).getStampLevel());
                jsonDataSite.put("name",siteList.get(i).getName());
                jsonDataSite.put("url",siteList.get(i).getUrl());
                jsonDataSite.put("last_score",siteList.get(i).getLastScore());
                jsonDataSite.put("average",siteList.get(i).getAverage());
                jsonDataSite.put("pages",subsiteEntities.toArray().length);
                jsonDataSite.put("stamp", stampEntity.getImage());
                jsonData.put(jsonDataSite);
            }

            jsonResponse.put("success", true);
            jsonResponse.put("data", jsonData.toString());
            jsonResponse.put("errors", null);
        }catch(JSONException e){
            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", e);
        }

        return jsonResponse.toString();
    }

    @GetMapping("/get")
    public String get(@RequestBody String requestBody) throws JSONException {
        JSONObject body = new JSONObject(requestBody);
        SiteEntity siteEntity = siteRepository.findSiteEntityById(Long.parseLong(body.get("id").toString()));
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONObject jsonData = new JSONObject();

            List<SubsiteEntity> subsiteEntities = subsiteRepository.findBySiteId(siteEntity.getId());
            StampEntity stampEntity = stampRepository.findByStampLevel(siteEntity.getStampLevel());

            jsonData.put("name",siteEntity.getName());
            jsonData.put("url",siteEntity.getUrl());
            jsonData.put("last_score",siteEntity.getLastScore());
            jsonData.put("average",siteEntity.getAverage());
            jsonData.put("pages",subsiteEntities.toArray().length);
            jsonData.put("stamp", stampEntity.getImage());

            jsonResponse.put("success", true);
            jsonResponse.put("data", jsonData.toString());
            jsonResponse.put("errors", null);
        }catch(JSONException e){
            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", e);
        }

        return jsonResponse.toString();
    }

    @PostMapping("/update")
    public String update(@RequestBody String requestBody) throws JSONException, IOException {
        JSONObject body = new JSONObject(requestBody);
        JSONObject jsonResponse = new JSONObject();

        SiteEntity siteEntity = siteRepository.findSiteEntityById(Long.parseLong(body.get("id").toString()));
        QueueEntity queueEntity = new QueueEntity();

        if(body.get("site").toString() != null){
            try{
                siteEntity.setUrl(body.get("url").toString());
                siteEntity.setName(body.get("name").toString());
                queueEntity.setUrl(body.get("url").toString());
                queueRepository.save(queueEntity);
                siteRepository.save(siteEntity);

                jsonResponse.put("success", true);
                jsonResponse.put("data", null);
                jsonResponse.put("errors", null);
            }catch(JSONException e){
                jsonResponse.put("success", false);
                jsonResponse.put("data", null);
                jsonResponse.put("errors", e);
            }
        }else{
            JSONArray errors = new JSONArray();
            errors.put("Campos obrigatórios não foram informados.");

            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", errors);
        }

        return jsonResponse.toString();
    }

    @PostMapping("/delete")
    public String delete(@RequestBody String requestBody) throws JSONException, IOException {
        JSONObject body = new JSONObject(requestBody);
        JSONObject jsonResponse = new JSONObject();

        SiteEntity siteEntity = siteRepository.findSiteEntityById(Long.parseLong(body.get("id").toString()));
        QueueEntity queueEntity = queueRepository.findByUrl(siteEntity.getUrl());

        try{
            if(queueEntity != null){
                queueRepository.delete(queueEntity);
            }
            siteRepository.delete(siteEntity);

            jsonResponse.put("success", true);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", null);
        }catch(JSONException e){
            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", e);
        }

        return jsonResponse.toString();
    }

}
