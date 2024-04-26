package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
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


    public FlaskClientService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper, ChecklistRepository checklistRepository) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:5000").build();
        this.objectMapper = objectMapper;
        this.checklistRepository = checklistRepository;
    }

    /* flask -> spring */
    public Mono<String> getTextFromFlaskServer() {
        return webClient.get()
                .uri("/test")
                .retrieve()
                .bodyToMono(String.class);
    }

    /* spring -> flask */
        @Transactional
        public String sendToFlask(AddChecklistRequest addChecklistRequest) throws JsonProcessingException {
            RestTemplate restTemplate = new RestTemplate();

            //헤더를 JSON으로 설정함
            HttpHeaders headers = new HttpHeaders();

            //파라미터로 들어온 dto를 JSON 객체로 변환
            headers.setContentType(MediaType.APPLICATION_JSON);

            String data = addChecklistRequest.getName();
            String jsonData = objectMapper.writeValueAsString(data);

            HttpEntity<String> entity = new HttpEntity<String>(jsonData , headers);

            //실제 Flask 서버랑 연결하기 위한 URL
            String url = "http://localhost:5000/predict";

            //Flask 서버로 데이터를 전송하고 받은 응답 값을 return
            return restTemplate.postForObject(url, entity, String.class);
        }
}