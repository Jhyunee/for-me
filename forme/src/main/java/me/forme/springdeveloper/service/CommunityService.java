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
        LocalDate todayMonth = LocalDate.now();
        LocalDate lastMonth = localDate.minusMonths(1);
        LocalDate last2Month = localDate.minusMonths(2);

        Reward today = rewardRepository.findByUserIdAndCreatedAt(userId, todayMonth).orElse(null);
        Reward last = rewardRepository.findByUserIdAndCreatedAt(userId, lastMonth).orElse(null);
        Reward last2 = rewardRepository.findByUserIdAndCreatedAt(userId, last2Month).orElse(null);

        if(today != null) {
            map.put(todayMonth.format(DateTimeFormatter.ofPattern("yyyy.MM")), today.getSaving());
        }
        if(last != null) {
            map.put(lastMonth.format(DateTimeFormatter.ofPattern("yyyy.MM")), last.getSaving());
        }
        if(last2 != null) {
            map.put(last2Month.format(DateTimeFormatter.ofPattern("yyyy.MM")), last2.getSaving());
        }
        return map;
    }

    // 다른 유저들과의 월 노력금 설정 비교 (또래 | 같은성별)
    public Map<String, Long> getReward(String userId) {
        Map<String, Long> map = new HashMap<>();

        // 또래
        LocalDate birth = userRepository.findByUserId(userId).get().getBirth();
        Long ageReward = rewardRepository.findByAgeReward(localDate, birth);
        map.put("age", ageReward);

        // 같은 성별
        String gender = userRepository.findByUserId(userId).get().getGender();
        Long genderReward = rewardRepository.findByGenderReward(localDate, gender);
        map.put("gender", genderReward);

        // 나의 노력금
        Long myReward = rewardRepository.findByUserIdAndCreatedAt(userId, localDate).get().getReward();
        map.put("myReward", myReward);

        return map;
    }

    // 다른 유저들과의 달성율 비교 (또래 | 같은성별)
    public Map<String, Double> getAchieve(String userId) {
        Map<String, Double> map = new HashMap<>();

        // 또래
        LocalDate birth = userRepository.findByUserId(userId).get().getBirth();
        Double ageAchieve = customQueryRepository.findDailyAchieveByAge(birth, localDate);
        map.put("age", ageAchieve);

        // 같은 성별
        String gender = userRepository.findByUserId(userId).get().getGender();
        Double genAchieve = customQueryRepository.findDailyAchieveByGender(gender, localDate);
        map.put("gender", genAchieve);

        // 나의 노력금
        Double myAchieve = customQueryRepository.findDailyAchieveByUserId(userId, localDate);
        map.put("myAchieve", myAchieve);

        return map;
    }

}
