package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    @Query(value =
            "SELECT * FROM REWARD T1 " +
                    "WHERE YEAR(T1.CREATED_AT) = YEAR(:inputDate) " +
                    "AND MONTH(T1.CREATED_AT) = MONTH(:inputDate) " +
                    "AND T1.USER_ID = :userId " +
                    "ORDER BY T1.CREATED_AT DESC " +
                    "LIMIT 1",
            nativeQuery = true)
    Reward findByUserIdAndCreatedAt(@Param("userId") String userId, @Param("inputDate") LocalDate inputDate);
    Optional<Reward> findByUserId(String userId);

    @Query(value = "WITH CAL_INFO AS (" +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK, " +
            "           MONTH('20240101' + INTERVAL RNUM-1 DAY) MM, " +
            "           YEAR('20240101' + INTERVAL RNUM-1 DAY) YY " +
            "    FROM (" +
            "           SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "           FROM information_schema.columns " +
            "         ) T1 " +
            "    WHERE T1.RNUM <= 365 " +
            "    ORDER BY 1 " +
            ") " +
            "SELECT daily_reward " +
            "FROM (" +
            "    SELECT   T1.DATEID            DATEID, " +
            "             T1.USER_ID           USER_ID, " +
            "             SUM(T1.TOT_CNT)      TOT_CNT, " +
            "             SUM(T1.DONE_CNT)     DONE_CNT, " +
            "             SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT)  RATE, " +
            "             (SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT))*(T2.REWARD)    DAILY_REWARD " +
            "    FROM (" +
            "             SELECT  T1.MM             DATEID, " +
            "                     T3.USER_ID       USER_ID, " +
            "                     COUNT(*)         TOT_CNT, " +
            "                     NULL             DONE_CNT " +
            "             FROM    CAL_INFO         T1, " +
            "                     CHECKLIST        T2, " +
            "                     USERS            T3 " +
            "             WHERE   1 = 1 " +
            "             AND     T1.BASIS_YMD >= T2.CREATED_AT " +
            "             AND     (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "             AND     T2.USER_ID = T3.USER_ID " +
            "             GROUP BY T1.MM, T3.USER_ID " +
            "             UNION ALL " +
            "             SELECT   MONTH(T1.DONE_DATE)       DATEID, " +
            "                      T2.USER_ID                USER_ID, " +
            "                      NULL                      TOT_CNT, " +
            "                      COUNT(*)                  DONE_CNT " +
            "             FROM     DONE T1, " +
            "                      USERS T2 " +
            "             GROUP BY MONTH(T1.DONE_DATE), T2.USER_ID " +
            "         ) T1,  (SELECT * FROM REWARD T1 " +
            "                WHERE YEAR(T1.CREATED_AT) = YEAR(:inputDate) " +
            "                  AND MONTH(T1.CREATED_AT) = MONTH(:inputDate) " +
            "                  AND T1.USER_ID = :userId " +
            "                ORDER BY DAY(T1.CREATED_AT) DESC LIMIT 1) T2 " +
            "    WHERE 1=1 " +
            "          AND T1.USER_ID = T2.USER_ID " +
            "          AND YEAR(T2.CREATED_AT) = YEAR(:inputDate) " +
            "          AND MONTH(T2.CREATED_AT) = MONTH(:inputDate) " +
            "          AND T1.USER_ID = :userId " +
            "          AND T1.DATEID = MONTH(:inputDate) " +
            "    GROUP BY DATEID, USER_ID, T2.REWARD) T", nativeQuery = true)
    Long findSavedByUserIdAndDate(@Param("userId") String userId, @Param("inputDate") LocalDate inputDate);


    @Query(value = "WITH CAL_INFO AS ( " +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK, " +
            "           MONTH('20240101' + INTERVAL RNUM-1 DAY) MM, " +
            "           YEAR('20240101' + INTERVAL RNUM-1 DAY) YY " +
            "    FROM       ( " +
            "                 SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "                 FROM information_schema.columns " +
            "             ) T1 " +
            "    WHERE      T1.RNUM <= 365 " +
            "    ORDER BY   1 " +
            ") " +
            "SELECT dateid, IFNULL(monthly_reward, 0) AS monthly_reward " +
            "FROM ( " +
            "    SELECT " +
            "        T1.DATEID, " +
            "        T1.USER_ID, " +
            "        SUM(T1.TOT_CNT) TOT_CNT, " +
            "        SUM(T1.DONE_CNT) DONE_CNT, " +
            "        SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT) RATE, " +
            "        (SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT)) * (T2.REWARD) MONTHLY_REWARD " +
            "    FROM ( " +
            "        SELECT " +
            "            T1.MM DATEID, " +
            "            T3.USER_ID, " +
            "            COUNT(*) TOT_CNT, " +
            "            NULL DONE_CNT " +
            "        FROM " +
            "            CAL_INFO T1, " +
            "            CHECKLIST T2, " +
            "            USERS T3 " +
            "        WHERE " +
            "            1 = 1 " +
            "            AND T1.BASIS_YMD >= T2.CREATED_AT " +
            "            AND (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "            AND T2.USER_ID = T3.USER_ID " +
            "        GROUP BY " +
            "            T1.MM, " +
            "            T3.USER_ID " +
            "        UNION ALL " +
            "        SELECT " +
            "            MONTH(T1.DONE_DATE) DATEID, " +
            "            T2.USER_ID, " +
            "            NULL TOT_CNT, " +
            "            COUNT(*) DONE_CNT " +
            "        FROM " +
            "            DONE T1, " +
            "            USERS T2 " +
            "        where t1.user_id = t2.user_id" +
            "        GROUP BY " +
            "            MONTH(T1.DONE_DATE), " +
            "            T2.USER_ID " +
            "    ) T1, " +
            "    ( " +
            "        SELECT * FROM REWARD T1 " +
            "        WHERE 1 = 1 " +
            "              AND T1.USER_ID = :userId " +
            "        ORDER BY DAY(T1.CREATED_AT) DESC LIMIT 1 " +
            "    ) T2 " +
            "WHERE 1 = 1 " +
            "      AND T1.USER_ID = T2.USER_ID " +
            "      AND T1.USER_ID = :userId " +
            "GROUP BY " +
            "    DATEID, " +
            "    USER_ID, " +
            "    T2.REWARD " +
            ") T", nativeQuery = true)
    List<Map<Long, Double>> findSavedByUserId(@Param("userId") String userId);


    @Query(value = "SELECT AVG(r.reward) " +
            "FROM Users u LEFT JOIN Reward r " +
            "ON u.user_id = r.user_id " +
            "WHERE YEAR(r.created_at) = YEAR(:inputDate) " +
            "AND MONTH(r.created_at) = MONTH(:inputDate) " +
            "AND YEAR(u.birth) BETWEEN YEAR(:birth) - 2 AND YEAR(:birth) + 2 " , nativeQuery = true)
    Long findByAgeReward(@Param("inputDate") LocalDate inputDate, @Param("birth") LocalDate birth);
    @Query(value = "SELECT AVG(r.reward) " +
            "FROM Users u LEFT JOIN Reward r " +
            "ON u.user_id = r.user_id " +
            "WHERE YEAR(r.created_at) = YEAR(:inputDate) " +
            "AND MONTH(r.created_at) = MONTH(:inputDate) " +
            "AND u.gender = :gender ", nativeQuery = true)
    Long findByGenderReward(@Param("inputDate") LocalDate inputDate, @Param("gender") String gender);

}
