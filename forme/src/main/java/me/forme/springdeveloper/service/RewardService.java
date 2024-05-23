package me.forme.springdeveloper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.dto.AddRewardRequest;
import me.forme.springdeveloper.dto.UpdateCServiceRequest;
import me.forme.springdeveloper.dto.UpdateRewardRequest;
import me.forme.springdeveloper.repository.RewardRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class RewardService {
    private final RewardRepository rewardRepository;

    public Reward findById(String userId, String localDate) {
        return rewardRepository.findByUserIdAndCreatedAt(userId, localDate)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + userId));
    }

    public Reward findByDate(String userId, String date){
        return rewardRepository.findByUserIdAndCreatedAt(userId, date).orElse(null);
    }


    public Reward save(AddRewardRequest request, String userId, String date){
        return rewardRepository.save(request.toEntity(userId, date));
    }

    @Transactional
    public Reward update(String userId, UpdateRewardRequest request){
        Reward reward = rewardRepository.findByUserId(userId).orElse(null);
        if(reward != null) {
            reward.update(request.getReward());
            rewardRepository.save(reward);
        }
        return reward;
    }
}
