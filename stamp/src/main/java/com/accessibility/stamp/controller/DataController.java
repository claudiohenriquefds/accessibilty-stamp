package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.LogsEntity;
import com.accessibility.stamp.repository.LogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/data")
public class DataController {
    @Autowired
    private LogsRepository logsRepository;

    @GetMapping("/all")
    public List<LogsEntity> get(){
        return logsRepository.findAll();
    }
}
