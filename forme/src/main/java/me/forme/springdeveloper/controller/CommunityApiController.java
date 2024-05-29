package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
import me.forme.springdeveloper.dto.ShowCommunityRequest;
import me.forme.springdeveloper.repository.RewardRepository;
import me.forme.springdeveloper.service.ChecklistService;
import me.forme.springdeveloper.service.CommunityService;
import me.forme.springdeveloper.service.GetUserIdFromTokenService;
import me.forme.springdeveloper.service.RewardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Slf4j
public class CommunityApiController {

    private final CommunityService communityService;
    private final GetUserIdFromTokenService getUserIdFromTokenService;


    LocalDate localDate = LocalDate.now();

    // {id}와 @PathVariable String id는 테스트용
    // -> {id} 지우고 Principal principal, id에 principal.getName()

    // 커뮤니티 전체
    @GetMapping("/community")
    //public Map<String, Map<?,?>> commWhole(ShowChecklistRequest checkRequest){
    public Map<String, Object> commWhole(ShowChecklistRequest checkRequest){
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        Map<String, Object> map = new HashMap<>();
        // 랜덤 체크리스트 추출
        map.put("checklist", communityService.findRandomChecklistsExceptUserId(userId)); //list형 반환
        // 다른 유저들과의 노력금 비교 (또래 | 같은성별)
        map.put("reward", communityService.getReward(userId));
        // 다른 유저들과의 달성율 비교 (또래 | 같은성별)
        map.put("achieve", communityService.getAchieve(userId));
        // 커뮤니티 전체 탭 월별 노력금 (전체 월 적립 노력금 추출)
        map.put("monthlyReward", communityService.findSavedByUserId(userId));
        return map;
    }

}
