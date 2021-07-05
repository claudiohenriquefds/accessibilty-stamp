package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.entity.StampEntity;
import com.accessibility.stamp.repository.StampRepository;
import com.accessibility.stamp.repository.SiteRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/stamp")
public class StampController {

    @Autowired
    private StampRepository stampRepository;

    @Autowired
    private SiteRepository siteRepository;

    @GetMapping
    public String getStamp(@RequestParam("url") String url) throws JSONException {
        SiteEntity siteEntity = siteRepository.findByUrl(url);
        JSONObject jsonResponse = new JSONObject();

        try{
            StampEntity stampEntity = stampRepository.findByStampLevel(siteEntity.getStampLevel());

            JSONObject jsonData = new JSONObject();
            jsonData.put("image", stampEntity.getImage());
            jsonData.put("site_id", siteEntity.getId());

            String level = "";
            switch (stampEntity.getStampLevel()){
                case 1: level = "Inacessivel"; break;
                case 2: level = "Pouco acessivel"; break;
                case 3: level = "Moderado"; break;
                case 4: level = "Acessivel"; break;
                case 5: level = "Excelente"; break;
            }

            jsonData.put("level_description", level);
            jsonData.put("level", stampEntity.getStampLevel());

            jsonResponse.put("success",true);
            jsonResponse.put("data", jsonData.toString());
            jsonResponse.put("errors", null);
        }catch(Exception exception){
            jsonResponse.put("success",false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", exception);
        }

        return jsonResponse.toString();
    }
    
    @GetMapping(value = "/script.min.js", produces="text/javascript; charset=utf-8")
    public String getCDN() throws IOException {
        File file = ResourceUtils.getFile("classpath:script.min.js");
        String content = new String(Files.readAllBytes(file.toPath()));

        return content;
    }

    @GetMapping(value = "info")
    public String getInfo(@RequestParam String id) throws JSONException {
        JSONObject jsonResponse = new JSONObject();

        try{
            JSONObject jsonData = new JSONObject();
            SiteEntity siteEntity = siteRepository.findSiteEntityById(Long.parseLong(id));
            jsonData.put("url", siteEntity.getUrl());
            jsonData.put("name", siteEntity.getName());
            jsonData.put("last_score", siteEntity.getLastScore());
            jsonData.put("average", siteEntity.getAverage());

            jsonResponse.put("success",true);
            jsonResponse.put("data", jsonData.toString());
            jsonResponse.put("errors", null);
        }catch(Exception e){
            jsonResponse.put("success",false);
            jsonResponse.put("data", null);
            jsonResponse.put("errors", e);
        }

        return jsonResponse.toString();
    }

}
