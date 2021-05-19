package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.entity.StampEntity;
import com.accessibility.stamp.repository.StampRepository;
import com.accessibility.stamp.repository.SiteRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stamp")
public class StampController {

    @Autowired
    private StampRepository stampRepository;

    @Autowired
    private SiteRepository siteRepository;

    @CrossOrigin(origins = "http://localhost:5500")
    @GetMapping
    public String getStamp(@RequestParam("url") String url) throws JSONException {
        SiteEntity siteEntity = siteRepository.findByUrl(url);
        JSONObject jsonResponse = new JSONObject();

        if(siteEntity.getStampLevel() != null){
            StampEntity stampEntity = stampRepository.findByStampLevel(siteEntity.getStampLevel());
            jsonResponse.put("success",true);
            jsonResponse.put("image",stampEntity.getImage());
            return jsonResponse.toString();
        }else{
            jsonResponse.put("success",false);
            jsonResponse.put("error_message","Selo não encontrado para esse site.");
            return jsonResponse.toString();
        }
    }
    @GetMapping(value = "/script.min.js", produces="text/javascript; charset=utf-8")
    public String getCDN(){
        return "window.onload=()=>{var t=new XMLHttpRequest;t.onload=function(){document.getElementById(\"stampAcessibility\").innerHTML=\"<img src='\"+JSON.parse(this.responseText).image+\"'>\"};var e=window.location.host;t.open(\"get\",\"http://localhost:8080/stamp?url=\"+e,!0),t.send()};\n";
    }

}
