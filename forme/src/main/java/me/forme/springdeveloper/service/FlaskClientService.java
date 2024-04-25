package me.forme.springdeveloper.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class FlaskClientService {

    private final WebClient webClient;

    public FlaskClientService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:5000").build();
    }

    public Mono<String> getTextFromFlaskServer() {
        return webClient.get()
                .uri("/test")
                .retrieve()
                .bodyToMono(String.class);
    }
}