package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.LogsEntity;
import com.accessibility.stamp.repository.LogsRepository;
import com.accessibility.stamp.service.AccessMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/")
public class DataController {

    @Autowired
    private LogsRepository logsRepository;

    @GetMapping("/evaluate")
    public List<LogsEntity> get() throws IOException {
        AccessMonitorService accessMonitorService = new AccessMonitorService();
        LogsEntity logs = new LogsEntity();
        logs.setLogs(accessMonitorService.getValidation("https://www.acessoparatodos.com.br/").toString());
        logsRepository.save(logs);
        return logsRepository.findAll();
    }
}
