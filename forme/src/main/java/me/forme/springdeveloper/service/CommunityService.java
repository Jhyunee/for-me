package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
import me.forme.springdeveloper.repository.RewardRepository;
import me.forme.springdeveloper.repository.UserRepository;
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

    // 다른 유저들의 체크리스트 랜덤 3개
    // 랜덤 숫자 3개로 체크리스트 아이디
    // 체크리스트 아이디 몇번까지 있는지.. 가져오기.. -> 어떻게?
    public Map<Long, String> getRanChecklist (ShowChecklistRequest request) {
        long [] array = new long[3];
        Long id = checklistService.findByMaxId();
        for(int i = 0; i < 3; i++) {
            array[i] = (long) (Math.random()*id+1);
            // 중복값 제거
            for(int j = 0; i < i; j++) {
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
        String todayMonth = localDate.format(DateTimeFormatter.ofPattern("yyyy.MM"));
        log.info(todayMonth);
        String lastMonth = localDate.minusMonths(1).format(DateTimeFormatter.ofPattern("yyyy.MM"));
        log.info(lastMonth);
        String last2Month = localDate.minusMonths(2).format(DateTimeFormatter.ofPattern("yyyy.MM"));
        log.info(last2Month);

        if(rewardRepository.findByUserIdAndCreatedAt(userId, todayMonth).isPresent()) {
            map.put(todayMonth, rewardRepository.findByUserIdAndCreatedAt(userId, todayMonth).get().getSaving());
            log.info(todayMonth + rewardRepository.findByUserIdAndCreatedAt(userId, todayMonth).get().getSaving());
        }
        if(rewardRepository.findByUserIdAndCreatedAt(userId, lastMonth).isPresent()) {
            map.put(lastMonth, rewardRepository.findByUserIdAndCreatedAt(userId, lastMonth).get().getSaving());
        }
        if(rewardRepository.findByUserIdAndCreatedAt(userId, last2Month).isPresent()) {
            map.put(last2Month, rewardRepository.findByUserIdAndCreatedAt(userId, last2Month).get().getSaving());
        }
        return map;
    }

    // 다른 유저들과의 월 노력금 설정 비교 (또래 | 같은성별)
    public Map<String, Long> getSaving(String userId) {
        Map<String, Long> map = new HashMap<>();

        // 또래 -> user랑 reward join -> userId랑 같은 age, 이번달 createdAt, reward select -> reward리턴 이거AVG로 해도 될 듯..?
        /*select avg(b.reward)
         * from user a, reward b
         * on a.userId = b.userId
         * where created_at = 이번달
         * like a.birth = "회원의 생일 년도%"
         * 매개변수 param으로 이번달, 회원의 생일 년도
         * */
        String birth = userRepository.findByUserId(userId).get().getBirth().format(DateTimeFormatter.ofPattern("yyyy"));
        String now = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM"));
        Long ageReward = rewardRepository.findByAgeReward(now, birth);
        map.put("age", ageReward);

        // 같은 성별 user랑 reward join -> userId랑 같은 성별, 이번달 createdAt, reward select -> reward리턴 이거AVG로 해도 될 듯..?
        String gender = userRepository.findByUserId(userId).get().getGender();
        Long genderReward = rewardRepository.findByGenderReward(now, gender);
        map.put("gender", genderReward);

        // 나의 노력금
        Long myReward = rewardRepository.findByUserIdAndCreatedAt(userId, now).get().getReward();
        map.put("myReward", myReward);

        return map;
    }

    // 다른 유저들과의 달성율 비교 (또래 | 같은성별)
}
