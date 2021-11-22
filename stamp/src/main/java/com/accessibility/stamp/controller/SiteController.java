package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.*;
import com.accessibility.stamp.repository.*;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DetailRepository detailRepository;

    @Autowired
    private DetailElementRepository detailElementRepository;

    @PostMapping("/store")
    public String store(@RequestBody String requestBody, @RequestHeader("Authorization") String authorization) throws JSONException, IOException {
        JSONObject body = new JSONObject(requestBody);
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        JSONObject jsonResponse = new JSONObject();

        SiteEntity siteEntity = new SiteEntity();
        QueueEntity queueEntity = new QueueEntity();

        if(body.get("url").toString() != null){
            try{
                siteEntity.setUrl(body.get("url").toString());
                siteEntity.setName(body.get("name").toString());
                siteEntity.setUserId(userEntity.getId());
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
    public String show(@RequestHeader("Authorization") String authorization) throws JSONException {
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        List<SiteEntity> siteList = siteRepository.findAllByUserId(userEntity.getId());
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONArray jsonData = new JSONArray();

            for(int i = 0; i < siteList.toArray().length; i++){
                JSONObject jsonDataSite = new JSONObject();
                
                List<SubsiteEntity> subsiteEntities = subsiteRepository.findBySiteId(siteList.get(i).getId());
                StampEntity stampEntity = stampRepository.findByStampLevel(siteList.get(i).getStampLevel());

                String image = "";
                if(stampEntity != null){
                    image = stampEntity.getImage();
                }else{
                    stampEntity = stampRepository.findByStampLevel(1);
                    image = stampEntity.getImage();
                }

                jsonDataSite.put("id",siteList.get(i).getId());
                jsonDataSite.put("name",siteList.get(i).getName());
                jsonDataSite.put("url",siteList.get(i).getUrl());
                jsonDataSite.put("last_score",siteList.get(i).getLastScore());
                jsonDataSite.put("average",siteList.get(i).getAverage());
                jsonDataSite.put("pages",subsiteEntities.toArray().length);
                jsonDataSite.put("stamp", image);
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
    public String get(@RequestBody String requestBody, @RequestHeader("Authorization") String authorization) throws JSONException {
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        JSONObject body = new JSONObject(requestBody);
        SiteEntity siteEntity = siteRepository.findSiteEntityByIdAndUserId(Long.parseLong(body.get("id").toString()), userEntity.getId());
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONObject jsonData = new JSONObject();

            List<SubsiteEntity> subsiteEntities = subsiteRepository.findBySiteId(siteEntity.getId());
            StampEntity stampEntity = stampRepository.findByStampLevel(siteEntity.getStampLevel());

            String image = "";
            if(stampEntity != null){
                image = stampEntity.getImage();
            }

            jsonData.put("name",siteEntity.getName());
            jsonData.put("url",siteEntity.getUrl());
            jsonData.put("last_score",siteEntity.getLastScore());
            jsonData.put("average",siteEntity.getAverage());
            jsonData.put("pages",subsiteEntities.toArray().length);
            jsonData.put("stamp", image);

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
    public String update(@RequestBody String requestBody, @RequestHeader("Authorization") String authorization) throws JSONException, IOException {
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        JSONObject body = new JSONObject(requestBody);
        JSONObject jsonResponse = new JSONObject();

        SiteEntity siteEntity = siteRepository.findSiteEntityByIdAndUserId(Long.parseLong(body.get("id").toString()), userEntity.getId());
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

    @PostMapping("/delete")
    public String delete(@RequestBody String requestBody, @RequestHeader("Authorization") String authorization) throws JSONException, IOException {
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        JSONObject body = new JSONObject(requestBody);
        JSONObject jsonResponse = new JSONObject();

        SiteEntity siteEntity = siteRepository.findSiteEntityByIdAndUserId(Long.parseLong(body.get("id").toString()), userEntity.getId());
        if(siteEntity != null){
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
        }else{
            JSONArray errors = new JSONArray();
            errors.put("O site não foi encontrado.");

            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", errors);
        }

        return jsonResponse.toString();
    }

    @PostMapping("/get-detailed")
    public String getDetailed(@RequestBody String requestBody, @RequestHeader("Authorization") String authorization) throws JSONException {
        UserEntity userEntity = userRepository.findByToken(authorization.replaceAll("Bearer ",""));
        JSONObject body = new JSONObject(requestBody);
        SiteEntity siteEntity = siteRepository.findSiteEntityByIdAndUserId(Long.parseLong(body.get("id").toString()), userEntity.getId());
        List<DetailEntity> detailEntities = detailRepository.findDetailBySiteId(siteEntity.getId());
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONArray detailArray = new JSONArray();
            for(int contDetailArray = 0; contDetailArray < detailEntities.toArray().length; contDetailArray++){
                JSONObject jsonDetail = new JSONObject();

                jsonDetail.put("element", detailEntities.get(contDetailArray).getElement());
                jsonDetail.put("veredict", detailEntities.get(contDetailArray).getVeredict());
                jsonDetail.put("url", detailEntities.get(contDetailArray).getUrl());
                jsonDetail.put("description", detailEntities.get(contDetailArray).getDescription());

                List<DetailElementEntity> detailElementEntities = detailEntities.get(contDetailArray).getDetailElementEntities();
                JSONArray jsonDetailElementArray = new JSONArray();
                for(int contDetailElement = 0; contDetailElement < detailElementEntities.toArray().length; contDetailElement++){
                    JSONObject jsonDetailElement = new JSONObject();

                    jsonDetailElement.put("htmlCode", detailElementEntities.get(contDetailElement).getHtmlCode());
                    jsonDetailElement.put("pointer", detailElementEntities.get(contDetailElement).getPointer());

                    jsonDetailElementArray.put(jsonDetailElement);
                }

                jsonDetail.put("elements_detailed", jsonDetailElementArray);
                detailArray.put(jsonDetail);
            }

            jsonResponse.put("success", true);
            jsonResponse.put("data", detailArray);
            jsonResponse.put("errors", null);
        }catch(JSONException e){
            jsonResponse.put("success", false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", e);
        }

        return jsonResponse.toString();
    }
}
