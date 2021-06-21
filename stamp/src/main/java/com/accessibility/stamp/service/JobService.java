package com.accessibility.stamp.service;

import com.accessibility.stamp.entity.LogsEntity;
import com.accessibility.stamp.entity.QueueEntity;
import com.accessibility.stamp.entity.SiteEntity;
import com.accessibility.stamp.entity.SubsiteEntity;
import com.accessibility.stamp.repository.LogsRepository;
import com.accessibility.stamp.repository.QueueRepository;
import com.accessibility.stamp.repository.SiteRepository;
import com.accessibility.stamp.repository.SubsiteRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private LogsRepository logsRepository;

    @Autowired
    private SubsiteRepository subsiteRepository;

    @Scheduled(fixedRate = 60000)
    public void runJob() throws JSONException, IOException {
        List<QueueEntity> queues = queueRepository.findByRun(true);

        AccessMonitorService accessMonitorService = new AccessMonitorService();

        for(int i = 0; i < queues.toArray().length; i++){
            LogsEntity logsEntity = new LogsEntity();
            System.out.println("Avaliando: " + queues.get(i).getUrl());
            String resultValidation = accessMonitorService.getValidation(queues.get(i).getUrl()).toString();

            if(resultValidation != ""){
                JSONObject validation = new JSONObject(resultValidation);
                JSONObject result = new JSONObject(validation.getString("result"));
                JSONObject data = new JSONObject(result.getString("data"));

                logsEntity.setSiteId(queues.get(i).getId());
                logsEntity.setScore(data.getString("score"));
                logsEntity.setLogs(resultValidation);
                logsEntity.setSubsite(false);
                logsEntity.setUrl(queues.get(i).getUrl());
                logsRepository.save(logsEntity);

                SiteEntity siteEntity = siteRepository.findByUrl(queues.get(i).getUrl());

                if(siteEntity.getRunSubsites()){
                    int qtdHyperlinks = Integer.parseInt((new JSONObject(data.getString("elems"))).getString("a"));
                    JSONObject nodes = new JSONObject(data.getString("nodes"));
                    JSONArray hyperLinks = new JSONArray(nodes.getString("a"));

                    Document doc = Jsoup.parse(result.getString("pagecode"));
                    Elements links = doc.select("a");

                    int divider = 0;
                    for (Element link : links) {
                        LogsEntity logsEntitySubsite = new LogsEntity();
                        String hrefContent = link.attr("href");
                        String urlComplete = queues.get(i).getUrl()+hrefContent;

                        if((!hrefContent.equals("#") || !hrefContent.contains("#")) && (!hrefContent.contains("http") || hrefContent.contains(queues.get(i).getUrl()))){
                            System.out.println("Avaliando: "+urlComplete);
                            SubsiteEntity subsiteEntity = subsiteRepository.findSubsiteByUrl(urlComplete);
                            if(subsiteEntity == null){
                                subsiteEntity = new SubsiteEntity();
                            }
                            subsiteEntity.setSiteId(siteEntity.getId());

                            String resultValidationSubsite = accessMonitorService.getValidation(urlComplete).toString();
                            JSONObject validationSubsite = new JSONObject(resultValidationSubsite);
                            JSONObject resultSubsite = new JSONObject(validationSubsite.getString("result"));
                            JSONObject dataSubsite = new JSONObject(resultSubsite.getString("data"));

                            subsiteEntity.setLastScore(dataSubsite.getString("score"));
                            subsiteEntity.setUrl(urlComplete);
                            if(subsiteEntity == null){
                                subsiteEntity.setValidations(subsiteEntity.getValidations() + 1);
                            }else{
                                subsiteEntity.setValidations(1);
                            }

                            subsiteRepository.save(subsiteEntity);

                            logsEntitySubsite.setSiteId(queues.get(i).getId());
                            logsEntitySubsite.setUrl(urlComplete);
                            logsEntitySubsite.setScore(dataSubsite.getString("score"));
                            logsEntitySubsite.setLogs(resultValidationSubsite);
                            logsEntitySubsite.setSubsite(true);
                            logsRepository.save(logsEntitySubsite);
                        }else{
                            System.out.println("Url invalida: "+urlComplete);
                        }
                    }
                }

                siteEntity.setLastScore(data.getString("score"));
                siteEntity.setValidations(siteEntity.getValidations() + 1);
                siteEntity.setRunSubsites(false);
                siteRepository.save(siteEntity);

                queueRepository.delete(queues.get(i));
            }else{
                QueueEntity queueEntity = queueRepository.findByUrl(queues.get(i).getUrl());
                if(queueEntity.getAttempts() >= 3){
                    queueEntity.setRun(false);
                }else{
                    queueEntity.setAttempts(queueEntity.getAttempts() + 1);
                }
                queueRepository.save(queueEntity);
            }
        }
    }
}
