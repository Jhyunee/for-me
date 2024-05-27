package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userId); // userId로 사용자 정보 가져오기

    @Query(value = "SELECT USER_ID FROM USERS ", nativeQuery = true)
    List<String> findUserIdAll();
}
