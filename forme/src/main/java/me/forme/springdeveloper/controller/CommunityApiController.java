package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
import me.forme.springdeveloper.repository.RewardRepository;
import me.forme.springdeveloper.service.ChecklistService;
import me.forme.springdeveloper.service.CommunityService;
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

    LocalDate localDate = LocalDate.now().minusDays(1);

    // {id}와 @PathVariable String id는 테스트용
    // -> {id} 지우고 Principal principal, id에 principal.getName()

    // 커뮤니티 전체
    @GetMapping("/community/{id}")
    public Map<String, Map<?,?>> commWhole(ShowChecklistRequest checkRequest, /*Principal principal*/@PathVariable String id){
        Map<String, Map<?,?>> map = new HashMap<>();
        map.put("checklist", communityService.getRanChecklist(checkRequest));
        // 다른 유저들과의 노력금 비교 (또래 | 같은성별)
        map.put("reward", communityService.getSaving(id));
        // 다른 유저들과의 달성율 비교 (또래 | 같은성별)
        map.put("achieve", communityService.getAchievement(id));
        return map;
    }

    // 커뮤니티 전체 탭 월별 노력금
    @GetMapping("/api/community/reward/{id}")
    public Map<String, Long> reward(@PathVariable String id) {
        localDate = LocalDate.now();
        return communityService.findByUserIdAndDate(id, localDate);
    }

    // 커뮤니티 친구
}
