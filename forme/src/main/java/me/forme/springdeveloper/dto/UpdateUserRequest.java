package me.forme.springdeveloper.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserRequest {
    private String password;
    private String email;
    private String name;
    private String phone;
    private LocalDate birth;
    private String gender;
}
