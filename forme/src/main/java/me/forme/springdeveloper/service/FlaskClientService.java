package me.forme.springdeveloper.service;

import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.dto.UpdateChecklistRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import me.forme.springdeveloper.repository.ChecklistRepository;

@Service
public class FlaskClientService {

    private final WebClient webClient;

    private final ObjectMapper objectMapper;

    private final ChecklistRepository checklistRepository;

    private final ChecklistService checklistService;

    private String response;

    public FlaskClientService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper, ChecklistRepository checklistRepository, ChecklistService checklistService) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:5000").build();
        this.objectMapper = objectMapper;
        this.checklistRepository = checklistRepository;
        this.checklistService = checklistService;
    }

    /* flask -> spring */
    public Mono<String> getTextFromFlaskServer() {
        return webClient.get()
                .uri("/send")
                .retrieve()
                .bodyToMono(String.class);
    }

    /* spring -> flask */
    @Transactional // 원래 return String
    public String sendToFlaskAdd(AddChecklistRequest addChecklistRequest) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // 헤더 JSON으로 설정
        HttpHeaders headers = new HttpHeaders();

        Long id = addChecklistRequest.toEntity().getId();
        // 파라미터로 들어온 addChecklistRequest -> JSON 객체로 변환
        headers.setContentType(MediaType.APPLICATION_JSON);

        String data = addChecklistRequest.getName();
        String jsonData = objectMapper.writeValueAsString(data);
        HttpEntity<String> entity = new HttpEntity<String>(jsonData , headers);

        // Flask 서버 URL
        String url = "http://localhost:5000/predict";
        response = restTemplate.postForObject(url, entity, String.class);

        return response;
    }

    @Transactional // 원래 return String
    public String sendToFlaskUpdate(UpdateChecklistRequest updateChecklistRequest) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String data = updateChecklistRequest.getName();
        String jsonData = objectMapper.writeValueAsString(data);
        HttpEntity<String> entity = new HttpEntity<String>(jsonData , headers);

        // Flask 서버 URL
        String url = "http://localhost:5000/predict";
        response = restTemplate.postForObject(url, entity, String.class);

        return response;
    }
}