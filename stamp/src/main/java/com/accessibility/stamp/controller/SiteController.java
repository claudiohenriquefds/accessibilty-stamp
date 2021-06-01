package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.QueueEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.repository.QueueRepository;
import com.accessibility.stamp.repository.SiteRepository;
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

}
