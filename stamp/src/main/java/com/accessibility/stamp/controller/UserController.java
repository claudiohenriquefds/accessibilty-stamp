package com.accessibility.stamp.controller;

import com.accessibility.stamp.entity.UserEntity;
import com.accessibility.stamp.repository.UserRepository;
import com.accessibility.stamp.service.TokenService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public UserController(){
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostMapping("/register")
    public String register(@RequestBody String userData) throws JSONException {

        JSONObject jsonResponse = new JSONObject();

        try {
            JSONObject data = new JSONObject(userData);
            UserEntity userEntity = new UserEntity();
            userEntity.setName(data.get("name").toString());
            userEntity.setEmail(data.get("email").toString());
            userEntity.setPassword(this.passwordEncoder.encode(data.get("password").toString()));

            UserEntity userEntitySaved = userRepository.save(userEntity);
            userEntitySaved.setToken(new TokenService().generateToken(userEntitySaved));

            userRepository.save(userEntitySaved);

            jsonResponse.put("success",true);
            jsonResponse.put("authorization_token",userEntitySaved.getToken());

            return jsonResponse.toString();
        } catch (JSONException e) {
            jsonResponse.put("success",false);
            jsonResponse.put("error",e);

            return jsonResponse.toString();
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody String userData) throws JSONException{
        JSONObject jsonResponse = new JSONObject();

        try {
            JSONObject data = new JSONObject(userData);

            UserEntity user = userRepository.findByEmail(data.get("email").toString());
            if(this.passwordEncoder.matches(data.get("password").toString(), user.getPassword())){
                user.setToken(new TokenService().generateToken(user));
                userRepository.save(user);
                jsonResponse.put("success",true);
                jsonResponse.put("authorization_token",user.getToken());
            }else{
                jsonResponse.put("success",false);
                jsonResponse.put("error_message","Credênciais incorretas.");
            }
        }catch (JSONException e){
            jsonResponse.put("success",false);
            jsonResponse.put("error_message",e);
        }

        return jsonResponse.toString();
    }
}
