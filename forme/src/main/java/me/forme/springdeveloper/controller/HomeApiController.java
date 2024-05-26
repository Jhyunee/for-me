package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
import me.forme.springdeveloper.service.ChecklistService;
import me.forme.springdeveloper.service.GetUserIdFromTokenService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Slf4j
public class HomeApiController {

    private final ChecklistService checklistService;
    private final GetUserIdFromTokenService getUserIdFromTokenService;

    private LocalDate dateTime = LocalDate.now();

    @GetMapping("/api/home")
    public Map<String, List<Checklist>> index(@RequestBody ShowChecklistRequest request){
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        return checklistService.getChecklistsByDate(request, userId);
    }

    /*
    //체크리스트 조회 (오늘)
    @GetMapping("/api/home")
    public List<Checklist> index(){
        return checklistService.findByDate(LocalDate.now());
    }

    //체크리스트 조회 (전날)
    @GetMapping("/api/home/backward")
    public List<Checklist> backward() {
        dateTime = dateTime.minusDays(1);
        log.info("어제 날짜 : " + dateTime);
        return checklistService.findByDate(dateTime);
    }

    //체크리스트 조회 (다음날)
    @GetMapping("/api/home/forward")
    public List<Checklist> forward() {
        dateTime = dateTime.plusDays(1);
        log.info("다음 날짜 : " + dateTime);
        return checklistService.findByDate(dateTime);
    }

    //체크리스트 조회 (날짜)
    @GetMapping("/api/home/{date}")
    public List<Checklist> date(@PathVariable LocalDate date) {
        return checklistService.findByDate(date);
    }

     */
}
