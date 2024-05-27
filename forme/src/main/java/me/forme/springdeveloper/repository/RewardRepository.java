package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    @Query(value = "SELECT * " +
            "FROM Reward r " +
            "WHERE r.user_id = :userId " +
            "AND YEAR(r.created_at) = YEAR(:createdAt) " +
            "AND MONTH(r.created_at) = MONTH(:createdAt) ", nativeQuery = true)
    Optional<Reward> findByUserIdAndCreatedAt(@Param("userId") String userId, @Param("createdAt") LocalDate createdAt);
    Optional<Reward> findByUserId(String userId);

    @Query(value = "SELECT AVG(r.reward) " +
            "FROM Users u LEFT JOIN Reward r " +
            "ON u.user_id = r.user_id " +
            "WHERE YEAR(r.created_at) = YEAR(:createdAt) " +
            "AND MONTH(r.created_at) = MONTH(:createdAt) " +
            "AND YEAR(u.birth) BETWEEN YEAR(:birth) - 2 AND YEAR(:birth) + 2 " , nativeQuery = true)
    Long findByAgeReward(@Param("createdAt") LocalDate createdAt, @Param("birth") LocalDate birth);

    @Query(value = "SELECT AVG(r.reward) " +
            "FROM Users u LEFT JOIN Reward r " +
            "ON u.user_id = r.user_id " +
            "WHERE YEAR(r.created_at) = YEAR(:createdAt) " +
            "AND MONTH(r.created_at) = MONTH(:createdAt) " +
            "AND u.gender = :gender ", nativeQuery = true)
    Long findByGenderReward(@Param("createdAt") LocalDate createdAt, @Param("gender") String gender);
}
