package com.accessibility.stamp.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

@Service
public class AccessMonitorService{
    public String getValidation(String url) throws IOException {
        BufferedReader data = null;
        String result = "";
        String url_encoded = URLEncoder.encode(url, "ISO-8859-1");
        try {
            URL object_url = new URL("https://accessmonitor.acessibilidade.gov.pt/api/amp/eval/"+url_encoded);
            HttpURLConnection con = (HttpURLConnection) object_url.openConnection();
            con.setRequestMethod("GET");
            data = new BufferedReader(new InputStreamReader(con.getInputStream()));
            result = data.readLine();
            data.close();
            con.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        return result;
    }
}
