package me.forme.springdeveloper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.dto.AddRewardRequest;
import me.forme.springdeveloper.dto.UpdateRewardRequest;
import me.forme.springdeveloper.repository.RewardRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Slf4j
@Service
public class RewardService {
    private final RewardRepository rewardRepository;

    LocalDate localDate = LocalDate.now();

    public Reward save(String userId, AddRewardRequest request){
        Reward originReward = Reward.builder()
                .userId(userId)
                .createdAt(LocalDateTime.now())
                .reward(0L)
                .build();
        return rewardRepository.save(originReward);
    }

    public Reward update(String userId, UpdateRewardRequest request) {
        Reward updatedReward = Reward.builder()
                .userId(userId)
                .createdAt(LocalDateTime.now())
                .reward(request.getReward())
                .build();
        return rewardRepository.save(updatedReward);
    }
    public Reward saveReward(Reward reward) {
        return rewardRepository.save(reward);
    }

}
