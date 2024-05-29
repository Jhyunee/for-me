package me.forme.springdeveloper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.domain.User;
import me.forme.springdeveloper.dto.ShowCommunityRequest;
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


    LocalDate localDate = LocalDate.now();

    // 회원 정보 (이름, 아이디, 이메일) OK!
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

    // 이번달 쌓인 노력금 OK!
    public Map<String, Long> getSaved(String userId){
        Map<String, Long> map = new HashMap<>();
        Long saved = rewardRepository.findSavedByUserIdAndDate(userId, localDate);
        map.put("saving", saved);
        return map;
    }


    // 오늘의 달성율 ok!
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

    // 이번 달 설정한 노력금 ok!
    public Map<String, Long> getMonthlyReward(String userId){
        Map<String, Long> map = new HashMap<>();
        Reward reward = rewardRepository.findByUserIdAndCreatedAt(userId, localDate);
        if(reward != null) {
            map.put("reward", reward.getReward());
            return map;
        }
        else return null;
    }
}
