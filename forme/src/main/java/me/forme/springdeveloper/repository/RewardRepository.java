package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    Optional<Reward> findByUserIdAndCreatedAt(String userId, String date);
    Optional<Reward> findByCreatedAt(String date);
    Optional<Reward> findByUserId(String userId);

    @Query("SELECT AVG(r.reward) " +
            "FROM User u LEFT JOIN Reward r " +
            "ON u.userId = r.userId " +
            "WHERE r.createdAt = :createdAt " +
            "AND SUBSTRING(CAST(u.birth AS string), 1, 4) = :birth" )
    Long findByAgeReward(@Param("createdAt") String createdAt, @Param("birth") String birth);

    @Query("SELECT AVG(r.reward) " +
            "FROM User u LEFT JOIN Reward r " +
            "ON u.userId = r.userId " +
            "WHERE r.createdAt = :createdAt " +
            "AND u.gender = :gender")
    Long findByGenderReward(@Param("createdAt") String createdAt, @Param("gender") String gender);
}
