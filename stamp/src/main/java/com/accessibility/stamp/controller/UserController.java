package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.UserEntity;
import com.accessibility.stamp.repository.UserRepository;
import com.accessibility.stamp.service.TokenService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody String userData) throws JSONException {
        try {
            JSONObject data = new JSONObject(userData);
            UserEntity userEntity = new UserEntity();
            userEntity.setName(data.get("name").toString());
            userEntity.setEmail(data.get("email").toString());
            userEntity.setPassword(data.get("password").toString());

            UserEntity userEntitySaved = userRepository.save(userEntity);
            userEntitySaved.setToken(new TokenService().generateToken(userEntitySaved));

            userRepository.save(userEntitySaved);

            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("success",true);
            jsonResponse.put("authorization_token",userEntitySaved.getToken());

            return jsonResponse.toString();
        } catch (JSONException e) {
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("success",false);
            jsonResponse.put("error",e);

            return jsonResponse.toString();
        }
    }

}
