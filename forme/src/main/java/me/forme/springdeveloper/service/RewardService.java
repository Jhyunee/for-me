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

    public Reward findById(String userId, LocalDate localDate) {
        return rewardRepository.findByUserIdAndCreatedAt(userId, localDate)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + userId));
    }

    public Reward findByDate(String userId, LocalDate date){
        return rewardRepository.findByUserIdAndCreatedAt(userId, date).orElse(null);
    }


    public Reward save(AddRewardRequest request, String userId){
        return rewardRepository.save(request.toEntity(userId));
    }

    @Transactional
    public Reward update(String userId, UpdateRewardRequest request){
        Reward reward = rewardRepository.findByUserId(userId).orElse(null);
        if(reward != null) {
            reward.update(request.getReward(), LocalDateTime.now());
            rewardRepository.save(reward);
        }
        return reward;
    }

//    @Transactional
//    public void updateSaving(String userId, Long saving){
//        Reward reward = rewardRepository.findByUserIdAndCreatedAt(userId, localDate).orElse(null);
//        if(reward != null){
//            reward.updateSaving(reward.getSaving() + saving);
//            rewardRepository.save(reward);
//        }
//    }
}
