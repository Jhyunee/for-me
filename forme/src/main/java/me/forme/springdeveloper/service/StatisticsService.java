package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.dto.StatisticAchieveResponse;
import me.forme.springdeveloper.dto.StatisticCategoryCountResponse;
import me.forme.springdeveloper.repository.ChecklistRepository;
import me.forme.springdeveloper.repository.CustomQueryRepository;
import me.forme.springdeveloper.repository.DoneRepository;
import me.forme.springdeveloper.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StatisticsService {
    private final UserRepository userRepository;
    private final ChecklistRepository checklistRepository;
    private final DoneRepository doneRepository;
    private final CustomQueryRepository customQueryRepository;

    public Map<String, List<? extends Object>> getStats(String userId) {
        Map<String, List<? extends Object>> resultMap = new HashMap<>();

        // Weekly Achieve Stats
        List<Object[]> weeklyAchieveResults = customQueryRepository.findWeeklyStatsByUserId(userId);
        List<StatisticAchieveResponse> weeklyAchieveStats = weeklyAchieveResults.stream()
                .map(record -> new StatisticAchieveResponse(
                        Integer.parseInt(String.valueOf(((Number) record[0]).longValue())),
                        (String) record[1],
                        record[2] != null ? ((Number) record[2]).longValue() : 0L,
                        record[3] != null ? ((Number) record[3]).longValue() : 0L,
                        record[4] != null ? ((Number) record[4]).doubleValue() : 0.0
                ))
                .collect(Collectors.toList());
        resultMap.put("weeklyAchieve", weeklyAchieveStats);

        // Monthly Achieve Stats
        List<Object[]> monthlyAchieveResults = customQueryRepository.findMonthlyStatsByUserId(userId);
        List<StatisticAchieveResponse> monthlyAchieveStats = monthlyAchieveResults.stream()
                .map(record -> new StatisticAchieveResponse(
                        Integer.parseInt(String.valueOf(((Number) record[0]).longValue())),
                        (String) record[1],
                        record[2] != null ? ((Number) record[2]).longValue() : 0L,
                        record[3] != null ? ((Number) record[3]).longValue() : 0L,
                        record[4] != null ? ((Number) record[4]).doubleValue() : 0.0
                ))
                .collect(Collectors.toList());
        resultMap.put("monthlyAchieve", monthlyAchieveStats);

        // Yearly Achieve Stats
        List<Object[]> yearlyAchieveResults = customQueryRepository.findYearlyStatsByUserId(userId);
        List<StatisticAchieveResponse> yearlyAchieveStats = yearlyAchieveResults.stream()
                .map(record -> new StatisticAchieveResponse(
                        Integer.parseInt(String.valueOf(((Number) record[0]).longValue())),
                        (String) record[1],
                        record[2] != null ? ((Number) record[2]).longValue() : 0L,
                        record[3] != null ? ((Number) record[3]).longValue() : 0L,
                        record[4] != null ? ((Number) record[4]).doubleValue() : 0.0
                ))
                .collect(Collectors.toList());
        resultMap.put("yearlyAchieve", yearlyAchieveStats);

        // Weekly Category Stats
        List<Object[]> weeklyCategoryResults = customQueryRepository.findWeeklyCategoryStatsByUserId(userId);
        List<StatisticCategoryCountResponse> weeklyCategoryStats = weeklyCategoryResults.stream()
                .map(record -> new StatisticCategoryCountResponse(
                        ((Number) record[0]).intValue(),
                        (String) record[1],
                        ((Number) record[2]).intValue(),
                        (String) record[3]
                ))
                .collect(Collectors.toList());
        resultMap.put("weeklyCategory", weeklyCategoryStats);

        // Monthly Category Stats
        List<Object[]> monthlyCategoryResults = customQueryRepository.findMonthlyCategoryStatsByUserId(userId);
        List<StatisticCategoryCountResponse> monthlyCategoryStats = monthlyCategoryResults.stream()
                .map(record -> new StatisticCategoryCountResponse(
                        ((Number) record[0]).intValue(),
                        (String) record[1],
                        ((Number) record[2]).intValue(),
                        (String) record[3]
                ))
                .collect(Collectors.toList());
        resultMap.put("monthlyCategory", monthlyCategoryStats);

        // Yearly Category Stats
        List<Object[]> yearlyCategoryResults = customQueryRepository.findYearlyCategoryStatsByUserId(userId);
        List<StatisticCategoryCountResponse> yearlyCategoryStats = yearlyCategoryResults.stream()
                .map(record -> new StatisticCategoryCountResponse(
                        ((Number) record[0]).intValue(),
                        (String) record[1],
                        ((Number) record[2]).intValue(),
                        (String) record[3]
                ))
                .collect(Collectors.toList());
        resultMap.put("yearlyCategory", yearlyCategoryStats);

        return resultMap;
    }
}