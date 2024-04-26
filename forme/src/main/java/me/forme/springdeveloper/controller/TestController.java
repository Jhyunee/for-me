package me.forme.springdeveloper.controller;

import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.service.FlaskClientService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class TestController {

    private final FlaskClientService flaskClientService;

    /* Flask로부터 데이터 받기 */
    @GetMapping("/flasktest")
    public Mono<String> getFlaskText() {
        return flaskClientService.getTextFromFlaskServer()
                .flatMap(flaskText -> {
                    // 받아온 텍스트를 가공하거나 원하는 처리를 수행할 수 있음
                    return Mono.just("Received text from Flask server: " + flaskText);
                });
    }


    /* Flask로 데이터 전송 */
    @PostMapping("/category")
    @ResponseBody
    public String sendToFlask(@RequestBody AddChecklistRequest addChecklistRequest) throws JsonProcessingException {



        return flaskClientService.sendToFlask(addChecklistRequest);
    }

}