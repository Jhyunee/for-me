package me.forme.springdeveloper.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class AddUserRequest {

    private String userId;
    private String password;
    private String email;
    private String name;
    private String phone;
    private LocalDate birth;
    private String gender;
    private LocalDate created_at;
}
