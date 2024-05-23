package me.forme.springdeveloper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.User;
import me.forme.springdeveloper.dto.AddUserRequest;
import me.forme.springdeveloper.dto.UpdateUserRequest;
import me.forme.springdeveloper.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddUserRequest dto) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        return userRepository.save(User.builder()
                .userId(dto.getUserId())
                .name(dto.getName())
                .birth(dto.getBirth())
                .created_at(LocalDate.now())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .gender(dto.getGender())
                .password(encoder.encode(dto.getPassword()))
                .build()).getId();
    }

    public User findById(String userId) throws UsernameNotFoundException {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 존재하지 않습니다."));
    }


    @Transactional
    public User update(String userId, UpdateUserRequest request) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if(user != null) {
            user.update(request.getEmail(), request.getName(), request.getPhone());
            userRepository.save(user);
        }
        return user;
    }

    public boolean changePassword(String userId, String oldPassword, String newPassword)
            throws UsernameNotFoundException {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 존재하지 않습니다."));

        if(!bCryptPasswordEncoder.matches(oldPassword, user.getPassword())) {
            return false;
        }
        else {
            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
    }
}
