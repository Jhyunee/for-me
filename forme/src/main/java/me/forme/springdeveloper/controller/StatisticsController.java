package me.forme.springdeveloper.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.dto.StatisticAchieveResponse;
import me.forme.springdeveloper.dto.StatisticCategoryCountResponse;
import me.forme.springdeveloper.service.GetUserIdFromTokenService;
import me.forme.springdeveloper.service.StatisticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Slf4j
public class StatisticsController {
    private final StatisticsService statisticsService;
    private final GetUserIdFromTokenService getUserIdFromTokenService;


    @GetMapping("/api/statics/checklist")
    public Map<String, List<? extends Object>> getAllStats(@RequestParam String selectedStatPeriod, @RequestParam String selectedCategoryPeriod) {
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        return statisticsService.getStats(userId, selectedStatPeriod, selectedCategoryPeriod);
    }
}
