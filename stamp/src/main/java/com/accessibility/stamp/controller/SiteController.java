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

    @PostMapping("/save")
    public boolean post(@RequestBody String url) throws JSONException, IOException {
        JSONObject json = new JSONObject(url);

        SiteEntity site = new SiteEntity();
        QueueEntity queue = new QueueEntity();

        if(json.get("site").toString() != null){
            site.setUrl(json.get("site").toString());
            site.setName(json.get("name").toString());
            queue.setUrl(json.get("site").toString());
            queueRepository.save(queue);
            siteRepository.save(site);

            return true;
        }

        return false;
    }
    @GetMapping("/list")
    public String list() throws JSONException {
        List<SiteEntity> sites = siteRepository.findAll();
        JSONArray result = new JSONArray();

        for(int i = 0; i < sites.toArray().length; i++){
            JSONObject json = new JSONObject();
            List<SubsiteEntity> subsiteEntities = subsiteRepository.findBySiteId(sites.get(i).getId());
            StampEntity stampEntity = stampRepository.findByStampLevel(sites.get(i).getStampLevel());
            json.put("name",sites.get(i).getName());
            json.put("url",sites.get(i).getUrl());
            json.put("last_score",sites.get(i).getLastScore());
            json.put("average",sites.get(i).getAverage());
            json.put("pages",subsiteEntities.toArray().length);
            json.put("stamp", stampEntity.getImage());
            result.put(json);
        }

        return result.toString();
    }

}
