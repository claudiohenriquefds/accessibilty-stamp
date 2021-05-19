package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.LogsEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.repository.LogsRepository;
import com.accessibility.stamp.repository.SiteRepository;
import com.accessibility.stamp.service.AccessMonitorService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/evaluate")
public class EvaluateController {

    @Autowired
    private LogsRepository logsRepository;

    @Autowired
    private SiteRepository siteRepository;

    @GetMapping("/run")
    public boolean evalue() throws IOException {
        AccessMonitorService accessMonitorService = new AccessMonitorService();
        LogsEntity logs = new LogsEntity();

        List<SiteEntity> sites = siteRepository.findAll();
        for(int i = 0; i < sites.toArray().length; i++){
            logs.setLogs(accessMonitorService.getValidation(sites.get(i).getUrl()).toString());
            int validation = sites.get(i).getValidations();
            sites.get(i).setValidations(validation+1);
            logsRepository.save(logs);
        }

        return true;
    }
}
