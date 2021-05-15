package com.accessibility.stamp.service;

import com.accessibility.stamp.entity.UserEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Date;

@Service
public class TokenService {
    private String key = "secret";

    private static final long expirationTime = 86400000;

    public String generateToken(UserEntity user){
        return Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setSubject("Acessibility Stamp API - JWT Token")
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public Authentication getAuthentication(HttpServletRequest request){
        String token = request.getHeader("Authorization");

        if (token != null) {
            String user = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token.replace("Bearer", ""))
                    .getBody()
                    .getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
            }
        }
        return null;
    }

}
