package me.forme.springdeveloper.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.domain.User;
import me.forme.springdeveloper.dto.*;
import me.forme.springdeveloper.service.MypageService;
import me.forme.springdeveloper.service.RewardService;
import me.forme.springdeveloper.service.UserService;
import org.springframework.cglib.core.Local;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@Slf4j
public class MypageApiController {

    private final RewardService rewardService;
    private final UserService userService;
    private final MypageService mypageService;

    LocalDate localDate = LocalDate.now();

    // url에서 {id}와 @PathVariable String id는 테스트용
    // -> {id} 지우고 Principal principal, id에 principal.getName()

    @GetMapping("/mypage/{id}")
    public Map<String, Map<String, ?>> mypage(@PathVariable String id) {
        Map<String, Map<String, ?>> map = new HashMap<>();
        // 회원 정보 (이름, 아이디, 이메일)
        map.put("userInfo", mypageService.getUserInfo(id));
        // 이번달 쌓인 노력금
        map.put("saved", mypageService.getSaved(id));
        // 오늘의 달성율
        map.put("achieve", mypageService.findByAchieveByUserId(id));
        // 이번달 설정한 노력금
        map.put("reward", mypageService.getMonthlyReward(id));
        return map;
    }


    //노력금 저장 -> home api에서 로그인할 때마다 if문 하는게 좋을까?
    //프론트에서 main화면에서 그냥 이거 호출하면 댈거 같기도
    @PostMapping("/api/mypage/money/{id}") // db에 오늘 month에 해당하는 데이터가 없다면
    public ResponseEntity<Reward> save(AddRewardRequest request, /*Principal principal*/ @PathVariable String id) {
        if(rewardService.findByDate(id, localDate) == null){
            Reward savedReward = rewardService.save(request, id);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(savedReward);
        }
        log.info("not saved");
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    // 노력금 수정
    @PatchMapping("/api/mypage/money/{id}")
    public ResponseEntity<Reward> money(@RequestBody UpdateRewardRequest request, /*Principal principal*/@PathVariable String id){
        Reward updated = rewardService.update(id, request);
        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

    // 비밀번호 변경
    @PostMapping("/api/mypage/password/{id}")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request, /*Principal principal*/ @PathVariable String id) {
        boolean changed = userService.changePassword(id, request.getOldPassword(), request.getNewPassword());
        if(changed) {
            return ResponseEntity.ok("Password changed successfully");
        }
        else return ResponseEntity.badRequest().build();
    }


    // 회원정보 수정
    @PatchMapping("/api/mypage/auth/{id}")
    public ResponseEntity<User> reauth(@RequestBody UpdateUserRequest request, /*Principal principal*/ @PathVariable String id){
        User userUpdated = userService.update(id, request);
        return (userUpdated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(userUpdated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
