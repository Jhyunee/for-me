package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
import me.forme.springdeveloper.repository.CustomQueryRepository;
import me.forme.springdeveloper.repository.RewardRepository;
import me.forme.springdeveloper.repository.UserRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class CommunityService {

    private final ChecklistService checklistService;
    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;
    private final CustomQueryRepository customQueryRepository;

    LocalDate localDate = LocalDate.now();

    // 다른 유저들의 체크리스트 랜덤 3개
    public Map<Long, String> getRanChecklist (ShowChecklistRequest request) {
        long [] array = new long[3];
        Long id = checklistService.findByMaxId();
        for(int i = 0; i < 3; i++) {
            array[i] = (long) (Math.random()*id+1);
            // 중복값 제거
            for(int j = 0; j < i; j++) {
                if(array[i] == array[j]){
                    i--;
                    break;
                }
            }
        }

        Map<Long, String> ranChecklist = new HashMap<>();
        for(int i = 0; i < 3; i++) {
            ranChecklist.put(i+1L, checklistService.findById(array[i]).getName());
        }

        return ranChecklist;
    }

    // 그동안 모은 노력금(월별) -> reward의 월별 saving
    public Map<String, Long> findByUserIdAndDate(String userId, LocalDate localDate) {
        Map<String, Long> map = new HashMap<>();
        LocalDate todayMonth = localDate;
        LocalDate lastMonth = localDate.minusMonths(1);
        LocalDate last2Month = localDate.minusMonths(2);


        if(rewardRepository.findByUserIdAndCreatedAt(userId, todayMonth).isPresent()) {
            map.put(todayMonth.format(DateTimeFormatter.ofPattern("yyyy.MM")), rewardRepository.findByUserIdAndCreatedAt(userId, todayMonth).get().getSaving());
        }
        if(rewardRepository.findByUserIdAndCreatedAt(userId, lastMonth).isPresent()) {
            map.put(lastMonth.format(DateTimeFormatter.ofPattern("yyyy.MM")), rewardRepository.findByUserIdAndCreatedAt(userId, lastMonth).get().getSaving());
        }
        if(rewardRepository.findByUserIdAndCreatedAt(userId, last2Month).isPresent()) {
            map.put(last2Month.format(DateTimeFormatter.ofPattern("yyyy.MM")), rewardRepository.findByUserIdAndCreatedAt(userId, last2Month).get().getSaving());
        }
        return map;
    }

    // 다른 유저들과의 월 노력금 설정 비교 (또래 | 같은성별)
    public Map<String, Long> getSaving(String userId) {
        Map<String, Long> map = new HashMap<>();

        // 또래
        LocalDate birth = userRepository.findByUserId(userId).get().getBirth();
        Long ageReward = rewardRepository.findByAgeReward(localDate, birth);
        if(ageReward != null) {
            map.put("age", ageReward);
        }
        else {
            map.put("age", 0L);
        }


        // 같은 성별
        String gender = userRepository.findByUserId(userId).get().getGender();
        Long genderReward = rewardRepository.findByGenderReward(localDate, gender);
        if(genderReward != null) {
            map.put("gender", genderReward);
        }
        else {
            map.put("gender", 0L);
        }

        // 나의 노력금
        Long myReward = rewardRepository.findByUserIdAndCreatedAt(userId, localDate).get().getReward();
        if(myReward != null) {
            map.put("myReward", myReward);        }
        else {
            map.put("myReward", 0L);
        }

        return map;
    }

    // 다른 유저들과의 달성율 비교 (또래 | 같은성별)
    public Map<String, Double> getAchievement(String userId) {
        Map<String, Double> map = new HashMap<>();
        // 또래
        LocalDate birth = userRepository.findByUserId(userId).get().getBirth();
        try {
            Double ageAchieve = customQueryRepository.findDailyAchieveByAge(birth, localDate) * 100;
            map.put("age", ageAchieve);
        }
        catch (NullPointerException e){
            map.put("age", 0.0);
        }

        // 같은 성별
        String gender = userRepository.findByUserId(userId).get().getGender();
        try {
            Double genAchieve = customQueryRepository.findDailyAchieveByGender(gender, localDate) * 100;
            map.put("gender", genAchieve);
        }
        catch (NullPointerException e){
            map.put("gender", 0.0);
        }

        // 나의 달성율
        try {
            Double myAchieve = customQueryRepository.findDailyAchieveByUserId(userId, localDate) * 100;
            map.put("myAchieve", myAchieve);
        }
        catch (NullPointerException e) {
            map.put("myAchieve", 0.0);
        }


        return map;
    }
}
