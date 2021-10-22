package com.accessibility.stamp.service;

import com.accessibility.stamp.entity.*;
import com.accessibility.stamp.repository.*;
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

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

@Service
@Transactional
public class JobService {

    @Autowired
    private QueueRepository queueRepository;

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private LogsRepository logsRepository;

    @Autowired
    private SubsiteRepository subsiteRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private DetailRepository detailRepository;

    @Autowired
    private DetailElementRepository detailElementRepository;

    @Scheduled(fixedRate = 60000)
    public void runJob() throws JSONException, IOException {
        List<QueueEntity> queues = queueRepository.findByRun(true);

        AccessMonitorService accessMonitorService = new AccessMonitorService();

        for(int i = 0; i < queues.toArray().length; i++){
            LogsEntity logsEntity = new LogsEntity();
            HistoryEntity historyEntity = new HistoryEntity();

            System.out.println("Avaliando: " + queues.get(i).getUrl());
            String resultValidation = accessMonitorService.getValidation(queues.get(i).getUrl()).toString();

            SiteEntity siteEntity = siteRepository.findByUrl(queues.get(i).getUrl());

            if(resultValidation != ""){
                double average = 0;
                int averageQuantity = 0;
                JSONObject validation = new JSONObject(resultValidation);
                JSONObject result = new JSONObject(validation.getString("result"));
                JSONObject data = new JSONObject(result.getString("data"));
                JSONObject nodes = new JSONObject(data.getString("nodes"));

                Iterator<?> nodesKeys = nodes.keys();

                List<DetailEntity> deletedDetailEntity = detailRepository.findDetailBySiteId(siteEntity.getId());
                if(deletedDetailEntity.toArray().length > 0){
                    detailRepository.deleteBySiteIdAndSubsite(siteEntity.getId(), false);
                }

                while(nodesKeys.hasNext()){
                    JSONArray nodeArray =  new JSONArray(nodes.getString((String) nodesKeys.next()));
                    if(nodeArray.length() > 0){
                        JSONObject nodeObject = new JSONObject(nodeArray.get(0).toString());
                        DetailEntity detailEntity = new DetailEntity();
                        detailEntity.setElement((String) nodesKeys.next());
                        detailEntity.setDescription(nodeObject.getString("description").toString());
                        detailEntity.setVeredict(nodeObject.getString("verdict").toString());
                        detailEntity.setSubsite(false);
                        detailEntity.setUrl(queues.get(i).getUrl());
                        detailEntity.setSiteId(siteEntity.getId());
                        detailRepository.save(detailEntity);

                        JSONArray nodeElementArray = new JSONArray(nodeObject.getString("elements").toString());

                        for(int contNodeElement = 0; contNodeElement < nodeElementArray.length(); contNodeElement++){
                            JSONObject nodeElementDetailed = new JSONObject(nodeElementArray.get(contNodeElement).toString());
                            DetailElementEntity detailElementEntity = new DetailElementEntity();
                            detailElementEntity.setDetailEntity(detailEntity);
                            detailElementEntity.setPointer(nodeElementDetailed.getString("pointer").toString());
                            detailElementEntity.setHtmlCode(nodeElementDetailed.getString("htmlCode").toString());
                            detailElementRepository.save(detailElementEntity);
                        }
                    }
                }

                logsEntity.setSiteId(siteEntity.getId());
                logsEntity.setScore(data.getString("score"));
                logsEntity.setLogs(resultValidation);
                logsEntity.setSubsite(false);
                logsEntity.setUrl(queues.get(i).getUrl());
                logsEntity.setStatus(1);
                logsRepository.save(logsEntity);

                if(siteEntity.getRunSubsites()){
                    int qtdHyperlinks = Integer.parseInt((new JSONObject(data.getString("elems"))).getString("a"));
                    JSONArray hyperLinks = new JSONArray(nodes.getString("a"));

                    Document doc = Jsoup.parse(result.getString("pagecode"));
                    Elements links = doc.select("a");

                    int divider = 0;
                    for (Element link : links) {
                        LogsEntity logsEntitySubsite = new LogsEntity();
                        String hrefContent = link.attr("href");

                        if(hrefContent.contains(queues.get(i).getUrl())){
                            hrefContent = hrefContent.replaceAll(queues.get(i).getUrl(), "");
                        }

                        String urlComplete = queues.get(i).getUrl()+hrefContent;

                        if(!hrefContent.contains("#") && !hrefContent.contains("mailto") && !urlComplete.equals(queues.get(i).getUrl()+"/") && (!hrefContent.contains("http") || hrefContent.contains(queues.get(i).getUrl())) && !urlComplete.equals(queues.get(i).getUrl())){
                            System.out.println("Avaliando: "+urlComplete);
                            SubsiteEntity subsiteEntity = subsiteRepository.findSubsiteByUrl(urlComplete);
                            if(subsiteEntity == null){
                                subsiteEntity = new SubsiteEntity();
                            }
                            subsiteEntity.setSiteId(siteEntity.getId());

                            String resultValidationSubsite = accessMonitorService.getValidation(urlComplete).toString();

                            if(resultValidationSubsite != ""){
                                JSONObject validationSubsite = new JSONObject(resultValidationSubsite);
                                JSONObject resultSubsite = new JSONObject(validationSubsite.getString("result"));
                                JSONObject dataSubsite = new JSONObject(resultSubsite.getString("data"));
                                JSONObject nodesSubsite = new JSONObject(dataSubsite.getString("nodes"));

                                subsiteEntity.setLastScore(dataSubsite.getString("score"));
                                subsiteEntity.setUrl(urlComplete);
                                if(subsiteEntity == null){
                                    subsiteEntity.setValidations(subsiteEntity.getValidations() + 1);
                                }else{
                                    subsiteEntity.setValidations(1);
                                }

                                subsiteRepository.save(subsiteEntity);

                                Iterator<?> nodeKeysSubsite = nodesSubsite.keys();

                                List<DetailEntity> deletedDetailSubsiteEntity = detailRepository.findDetailByUrlAndSiteId(subsiteEntity.getUrl(), siteEntity.getId());
                                if(deletedDetailSubsiteEntity.toArray().length > 0){
                                    detailRepository.deleteBySiteIdAndSubsite(siteEntity.getId(), true);
                                }

                                while(nodeKeysSubsite.hasNext()){
                                    JSONArray nodeSubsiteArray =  new JSONArray(nodesSubsite.getString((String) nodeKeysSubsite.next()));
                                    if(nodeSubsiteArray.length() > 0) {
                                        JSONObject nodeSubsiteObject = new JSONObject(nodeSubsiteArray.get(0).toString());
                                        DetailEntity detailSubsiteEntity = new DetailEntity();
                                        detailSubsiteEntity.setElement((String) nodeKeysSubsite.next());
                                        detailSubsiteEntity.setDescription(nodeSubsiteObject.getString("description").toString());
                                        detailSubsiteEntity.setVeredict(nodeSubsiteObject.getString("verdict").toString());
                                        detailSubsiteEntity.setSubsite(true);
                                        detailSubsiteEntity.setUrl(urlComplete);
                                        detailSubsiteEntity.setSiteId(siteEntity.getId());
                                        detailRepository.save(detailSubsiteEntity);

                                        JSONArray nodeSubsiteElementArray = new JSONArray(nodeSubsiteObject.getString("elements").toString());

                                        for (int contNodeSubsiteElement = 0; contNodeSubsiteElement < nodeSubsiteElementArray.length(); contNodeSubsiteElement++) {
                                            JSONObject nodeSubsiteElementDetailed = new JSONObject(nodeSubsiteElementArray.get(contNodeSubsiteElement).toString());
                                            DetailElementEntity detailSubsiteElementEntity = new DetailElementEntity();
                                            detailSubsiteElementEntity.setDetailEntity(detailSubsiteEntity);
                                            detailSubsiteElementEntity.setPointer(nodeSubsiteElementDetailed.getString("pointer").toString());
                                            detailSubsiteElementEntity.setHtmlCode(nodeSubsiteElementDetailed.getString("htmlCode").toString());
                                            detailElementRepository.save(detailSubsiteElementEntity);
                                        }
                                    }
                                }
                                logsEntitySubsite.setSiteId(siteEntity.getId());
                                logsEntitySubsite.setUrl(urlComplete);
                                logsEntitySubsite.setScore(dataSubsite.getString("score"));
                                logsEntitySubsite.setLogs(resultValidationSubsite);
                                logsEntitySubsite.setSubsite(true);
                                logsEntitySubsite.setStatus(1);
                                logsRepository.save(logsEntitySubsite);
                                average += Double.parseDouble(dataSubsite.getString("score"));
                                averageQuantity += 1;
                            }else{
                                logsEntitySubsite.setSiteId(siteEntity.getId());
                                logsEntitySubsite.setUrl(urlComplete);
                                logsEntitySubsite.setSubsite(true);
                                logsEntitySubsite.setLogs(resultValidationSubsite);
                                logsEntitySubsite.setStatus(2);
                                logsRepository.save(logsEntitySubsite);
                            }
                        }else{
                            System.out.println("Url invalida: "+urlComplete);
                        }
                    }
                }
                average += Double.parseDouble(data.getString("score"));
                average = average/(averageQuantity+1);
                int stampLevel = 0;
                if(average <= 0 && average < 2){
                    stampLevel = 1;
                }else if(average >= 2 && average < 4 ){
                    stampLevel = 2;
                }else if(average >= 4 && average < 6){
                    stampLevel = 3;
                }else if(average >= 6 && average < 8){
                    stampLevel = 4;
                }else if(average >= 8 && average <= 10){
                    stampLevel = 5;
                }

                siteEntity.setLastScore(data.getString("score"));
                siteEntity.setValidations(siteEntity.getValidations() + 1);
                siteEntity.setAverage(average);
                siteEntity.setStampLevel(stampLevel);
                siteEntity.setRunSubsites(false);
                siteRepository.save(siteEntity);

                historyEntity.setSiteId(siteEntity.getId());
                historyEntity.setScore(data.getString("score"));
                historyEntity.setAverage(average);
                historyEntity.setStatus(1);
                historyRepository.save(historyEntity);

                queueRepository.delete(queues.get(i));
            }else{
                QueueEntity queueEntity = queueRepository.findByUrl(queues.get(i).getUrl());
                if(queueEntity.getAttempts() >= 3){
                    queueEntity.setRun(false);
                }else{
                    queueEntity.setAttempts(queueEntity.getAttempts() + 1);
                }
                queueRepository.save(queueEntity);
                logsEntity.setSiteId(siteEntity.getId());
                logsEntity.setLogs(resultValidation);
                logsEntity.setSubsite(false);
                logsEntity.setUrl(queues.get(i).getUrl());
                logsEntity.setStatus(2);

                historyEntity.setSiteId(siteEntity.getId());
                historyEntity.setStatus(2);
                historyRepository.save(historyEntity);

                logsRepository.save(logsEntity);
            }
        }
    }
}
