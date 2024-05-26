package me.forme.springdeveloper.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.User;
import me.forme.springdeveloper.dto.AddUserRequest;
import me.forme.springdeveloper.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserApiController {

    private final UserService userService;

    @PostMapping("/user")
    public ResponseEntity<Long> signup(@RequestBody AddUserRequest request){
        userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .build();
    }


    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/testtest")
    public String TokenUserIdTest() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Authentication이 UserDetails를 구현한 객체인지 확인
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            // UserDetails에서 userId를 가져옴
            String userId = userDetails.getUsername();
            System.out.println(userId);

            // userId를 사용하여 통계 데이터를 조회하고 반환
            return userId;
        } else {
            // 인증되지 않은 경우 예외 처리
            throw new RuntimeException("User is not authenticated");
        }
    }
}
