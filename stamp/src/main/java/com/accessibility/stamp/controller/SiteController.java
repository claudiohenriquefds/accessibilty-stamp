package com.accessibility.stamp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SiteController {

    @RequestMapping("/site")
    public ResponseEntity<String> get(){
        return new ResponseEntity<>("123", HttpStatus.OK);
    }

}
