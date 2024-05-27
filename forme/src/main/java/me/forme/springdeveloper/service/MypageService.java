package me.forme.springdeveloper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.domain.User;
import me.forme.springdeveloper.repository.CustomQueryRepository;
import me.forme.springdeveloper.repository.RewardRepository;
import me.forme.springdeveloper.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Indexed;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Math.round;


@RequiredArgsConstructor
@Slf4j
@Service
public class MypageService {
    private final CustomQueryRepository customQueryRepository;
    private final UserRepository userRepository;
    private final RewardRepository rewardRepository;

    private final RewardService rewardService;

    LocalDate localDate = LocalDate.now();
    private List<String> getUserId(){
        List<String> userIds = userRepository.findUserIdAll();
        return userIds;
    }

    // 회원 정보 (이름, 아이디, 이메일)
    public Map<String, String> getUserInfo(String userId){
        Map<String, String> map = new HashMap<>();
        User user = userRepository.findByUserId(userId).orElse(null);
        if(user != null) {
            map.put("name", user.getName());
            map.put("userId", user.getUserId());
            map.put("email", user.getEmail());
        }
        return map;
    }

    // 이번달 쌓인 노력금
    public Map<String, Long> getSaved(String userId){
        Map<String, Long> map = new HashMap<>();
        Long saved = rewardRepository.findByUserIdAndCreatedAt(userId, localDate).get().getSaving();
        map.put("saving", saved);
        return map;
    }


    // 오늘의 달성율
    public Map<String, Double> findByAchieveByUserId(String userId) {
        Map<String, Double> map = new HashMap<>();
        try {
            Double achieve = customQueryRepository.findDailyAchieveByUserId(userId, localDate) * 100;
            map.put("achieve", achieve);
        }
        catch (NullPointerException e) {
            map.put("achieve", 0.0);
        }
        return map;
    }

    // 1달 설정한 노력금
    public Map<String, Long> getMonthlyReward(String userId){
        Map<String, Long> map = new HashMap<>();
        Long reward = rewardRepository.findByUserIdAndCreatedAt(userId, localDate).get().getReward();
        if(reward != null) {
            map.put("reward", reward);
            return map;
        }
        else return null;
    }

    @Transactional
    public void savedSaving(String userId) {
        Double saved = customQueryRepository.findDailySavedByUserId(userId, localDate.minusDays(1));
        Long saving = round(saved);
        Reward reward = rewardRepository.findByUserIdAndCreatedAt(userId, localDate).orElse(null);
        if(reward != null){
            reward.updateSaving(reward.getSaving() + saving);
            rewardRepository.save(reward);
        }
    }

    // 매일 00시마다 전날 노력금 저장
    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduleSavedSaving() {
        List<String> userIds = getUserId();
        for(String userId : userIds) {
            savedSaving(userId);
        }
    }

}
