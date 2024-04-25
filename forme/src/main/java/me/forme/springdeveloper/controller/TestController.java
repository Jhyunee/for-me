package me.forme.springdeveloper.controller;

import me.forme.springdeveloper.service.FlaskClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class TestController {

    private final FlaskClientService flaskClientService;

    @Autowired
    public TestController(FlaskClientService flaskClientService) {
        this.flaskClientService = flaskClientService;
    }

    @GetMapping("/flasktest")
    public Mono<String> getFlaskText() {
        return flaskClientService.getTextFromFlaskServer()
                .flatMap(flaskText -> {
                    // 받아온 텍스트를 가공하거나 원하는 처리를 수행할 수 있음
                    return Mono.just("Received text from Flask server: " + flaskText);
                });
    }
}