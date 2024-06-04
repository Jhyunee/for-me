package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.repository.ChecklistRepository;
import me.forme.springdeveloper.repository.CustomQueryRepository;
import me.forme.springdeveloper.repository.RewardRepository;
import me.forme.springdeveloper.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class CommunityService {

    private final ChecklistService checklistService;
    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;
    private final CustomQueryRepository customQueryRepository;
    private final ChecklistRepository checklistRepository;

    LocalDate localDate = LocalDate.now();

    public Map<Long, String> findRandomChecklistsExceptUserId(String userId) {
        List<Checklist> checklists = checklistRepository.findRandomChecklistsExceptUserId(userId);
        Map<Long, String> result = new HashMap<>();
        for (Checklist checklist : checklists) {
            result.put(checklist.getId(), checklist.getName());
        }
        return result;
    }


    // 사용자 별, 월별 축적 노력금 return 필요!!!!!!!!!!!!!!!!
    public List<Map<Long, Double>> findSavedByUserId(String userId) {
        List<Map<Long, Double>> queryResult = rewardRepository.findSavedByUserId(userId);
        if (queryResult != null && !queryResult.isEmpty()) {
            return queryResult; // 쿼리 결과가 있을 경우 결과 반환
        } else {
            return new ArrayList<>(); // 쿼리 결과가 없을 경우 빈 리스트 반환
        }

    }



    // 다른 유저들과의 월 노력금 설정 비교 (또래 | 같은성별)
    public Map<String, Long> getReward(String userId) {
        Map<String, Long> map = new HashMap<>();

        // 또래
        LocalDate birth = userRepository.findByUserId(userId).get().getBirth();
        Long ageReward = rewardRepository.findByAgeReward(localDate, birth);
        if (ageReward == null) {
            ageReward = 0L;
        }
        map.put("ageReward", ageReward);

        // 같은 성별
        String gender = userRepository.findByUserId(userId).get().getGender();
        Long genderReward = rewardRepository.findByGenderReward(localDate, gender);
        if (genderReward == null) {
            genderReward = 0L;
        }
        map.put("genderReward", genderReward);

        // 나의 노력금
        Reward myReward = rewardRepository.findByUserIdAndCreatedAt(userId, localDate);
        Long reward = 0L;
        if (myReward == null) {
            reward = 0L;
        }
        else {
            reward = myReward.getReward();
        }
        map.put("myReward", reward);

        return map;
    }

    // 다른 유저들과의 달성율 비교 (또래 | 같은성별)
    public Map<String, Double> getAchieve(String userId) {
        Map<String, Double> map = new HashMap<>();

        // 또래
        LocalDate birth = userRepository.findByUserId(userId).get().getBirth();
        Double ageAchieve = customQueryRepository.findDailyAchieveByAge(birth, localDate);
        if(ageAchieve == null) {
            ageAchieve = 0D;
        }
        map.put("ageAchieve", ageAchieve);

        // 같은 성별
        String gender = userRepository.findByUserId(userId).get().getGender();
        Double genAchieve = customQueryRepository.findDailyAchieveByGender(gender, localDate);
        if (genAchieve == null) {
            genAchieve = 0D;
        }
        map.put("genAchieve", genAchieve);

        // 나의 노력금
        Double myAchieve = customQueryRepository.findDailyAchieveByUserId(userId, localDate);
        if(myAchieve == null) {
            myAchieve = 0D;
        }
        map.put("myAchieve", myAchieve);

        return map;
    }

}
