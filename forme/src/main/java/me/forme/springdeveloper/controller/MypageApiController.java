package me.forme.springdeveloper.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.domain.Reward;
import me.forme.springdeveloper.domain.User;
import me.forme.springdeveloper.dto.*;
import me.forme.springdeveloper.service.GetUserIdFromTokenService;
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
import java.time.LocalDateTime;
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
    private final GetUserIdFromTokenService getUserIdFromTokenService;

    LocalDate localDate = LocalDate.now();

    // url에서 {id}와 @PathVariable String id는 테스트용
    // -> {id} 지우고 Principal principal, id에 principal.getName()

    @GetMapping("/mypage")
    public Map<String, Map<String, ?>> mypage() {
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        Map<String, Map<String, ?>> map = new HashMap<>();
        // 회원 정보 (이름, 아이디, 이메일)
        map.put("userInfo", mypageService.getUserInfo(userId));
        // 이번달 쌓인 노력금
        map.put("saved", mypageService.getSaved(userId));
        // 오늘의 달성율
        map.put("achieve", mypageService.findByAchieveByUserId(userId));
        // 이번달 설정한 노력금
        map.put("reward", mypageService.getMonthlyReward(userId));
        return map;
    }


    //노력금 저장 -> home api에서 로그인할 때마다 if문 하는게 좋을까?
    //프론트에서 main화면에서 그냥 이거 호출하면 댈거 같기도
    @PostMapping("/api/mypage/money") // db에 오늘 month에 해당하는 데이터가 없다면
    public ResponseEntity<Reward> save(AddRewardRequest request) {
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        Reward savedReward = rewardService.save(userId, request);

        return (savedReward != null) ?
                ResponseEntity.status(HttpStatus.OK).body(savedReward) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }


    // 노력금 수정
    @PatchMapping("/api/mypage/money")
    public ResponseEntity<Reward> money(@RequestBody UpdateRewardRequest request){
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        Reward updated = rewardService.update(userId, request);
        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 비밀번호 변경
    @PostMapping("/api/mypage/password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        boolean changed = userService.changePassword(userId, request.getOldPassword(), request.getNewPassword());
        if(changed) {
            return ResponseEntity.ok("Password changed successfully");
        }
        else return ResponseEntity.badRequest().build();
    }


    @GetMapping

    // 회원정보 수정
    @PatchMapping("/api/mypage/auth")
    public ResponseEntity<User> reauth(@RequestBody UpdateUserRequest request){
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        User userUpdated = userService.update(userId, request);
        return (userUpdated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(userUpdated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
