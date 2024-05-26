package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GetUserIdFromTokenService {
    public String getUserIdFromToken() {
        // 현재 사용자의 인증 정보를 가져옴
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
