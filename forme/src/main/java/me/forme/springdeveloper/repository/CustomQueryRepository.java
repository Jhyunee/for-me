package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CustomQueryRepository extends JpaRepository<Checklist, Long> {

    // 1. 유저별 주별 달성율 통계
    @Query(value = "WITH CAL_INFO AS ( " +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK " +
            "    FROM ( " +
            "        SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "        FROM information_schema.columns " +
            "    ) T1 " +
            "    WHERE T1.RNUM <= 365 " +
            "    ORDER BY 1 " +
            ") " +
            "SELECT " +
                "       T1.WK ymd, " +
                "       T1.USER_ID user_id, " +
                "       SUM(T1.TOT_CNT) tot_cnt, " +
                "       SUM(T1.DONE_CNT) done_cnt, " +
            "       SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT) rate " +
            "FROM ( " +
            "    SELECT T1.WK WK, " +
            "           T3.USER_ID USER_ID, " +
            "           COUNT(*) TOT_CNT, " +
            "           NULL DONE_CNT " +
            "    FROM CAL_INFO T1, " +
            "         CHECKLIST T2, " +
            "         USERS T3 " +
            "    WHERE T1.BASIS_YMD >= T2.CREATED_AT " +
            "      AND (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "      AND T2.USER_ID = T3.USER_ID " +
            "    GROUP BY T1.WK, T3.USER_ID " +
            "    UNION ALL " +
            "    SELECT T3.WK WK, " +
            "           T2.USER_ID USER_ID, " +
            "           NULL TOT_CNT, " +
            "           COUNT(*) DONE_CNT " +
            "    FROM DONE T1, " +
            "         USERS T2, " +
            "         CAL_INFO T3 " +
            "    WHERE T1.USER_ID = T2.USER_ID " +
            "      AND T1.DONE_DATE = T3.BASIS_YMD " +
            "    GROUP BY T3.WK, T2.USER_ID " +
            ") T1 " +
            "WHERE T1.USER_ID = :userId " +
            "GROUP BY T1.WK, T1.USER_ID", nativeQuery = true)
    List<Object[]> findWeeklyStatsByUserId(@Param("userId") String userId);

    //2. 유저별 월별 달성율 통계
    @Query(value = "WITH CAL_INFO AS ( " +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK, " +
            "           MONTH('20240101' + INTERVAL RNUM-1 DAY) MM " +
            "    FROM ( " +
            "        SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "        FROM information_schema.columns " +
            "    ) T1 " +
            "    WHERE T1.RNUM <= 365 " +
            "    ORDER BY 1 " +
            ") " +
            "SELECT T1.MM ymd, " +
            "       T1.USER_ID USER_ID, " +
            "       SUM(T1.TOT_CNT) TOT_CNT, " +
            "       SUM(T1.DONE_CNT) DONE_CNT, " +
            "       SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT) RATE " +
            "FROM ( " +
            "    SELECT T1.MM MM, " +
            "           T3.USER_ID USER_ID, " +
            "           COUNT(*) TOT_CNT, " +
            "           NULL DONE_CNT " +
            "    FROM CAL_INFO T1, " +
            "         CHECKLIST T2, " +
            "         USERS T3 " +
            "    WHERE T1.BASIS_YMD >= T2.CREATED_AT " +
            "      AND (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "      AND T2.USER_ID = T3.USER_ID " +
            "    GROUP BY T1.MM, T3.USER_ID " +
            "    UNION ALL " +
            "    SELECT T3.MM MM, " +
            "           T2.USER_ID USER_ID, " +
            "           NULL TOT_CNT, " +
            "           COUNT(*) DONE_CNT " +
            "    FROM DONE T1, " +
            "         USERS T2, " +
            "         CAL_INFO T3 " +
            "    WHERE T1.USER_ID = T2.USER_ID " +
            "      AND T1.DONE_DATE = T3.BASIS_YMD " +
            "    GROUP BY T3.MM, T2.USER_ID " +
            ") T1 " +
            "WHERE T1.USER_ID = :userId " +
            "GROUP BY T1.MM, T1.USER_ID", nativeQuery = true)
    List<Object[]> findMonthlyStatsByUserId(@Param("userId") String userId);

    //3. 유저별 연도별 달성율 통계 (현재 2024만)
    @Query(value = "WITH CAL_INFO AS ( " +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK, " +
            "           MONTH('20240101' + INTERVAL RNUM-1 DAY) MM, " +
            "           YEAR('20240101' + INTERVAL RNUM-1 DAY) YY " +
            "    FROM ( " +
            "        SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "        FROM information_schema.columns " +
            "    ) T1 " +
            "    WHERE T1.RNUM <= 365 " +
            "    ORDER BY 1 " +
            ") " +
            "SELECT T1.YY ymd, " +
            "       T1.USER_ID USER_ID, " +
            "       SUM(T1.TOT_CNT) TOT_CNT, " +
            "       SUM(T1.DONE_CNT) DONE_CNT, " +
            "       SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT) RATE " +
            "FROM ( " +
            "    SELECT T1.YY YY, " +
            "           T3.USER_ID USER_ID, " +
            "           COUNT(*) TOT_CNT, " +
            "           NULL DONE_CNT " +
            "    FROM CAL_INFO T1, " +
            "         CHECKLIST T2, " +
            "         USERS T3 " +
            "    WHERE T1.BASIS_YMD >= T2.CREATED_AT " +
            "      AND (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "      AND T2.USER_ID = T3.USER_ID " +
            "    GROUP BY T1.YY, T3.USER_ID " +
            "    UNION ALL " +
            "    SELECT T3.YY YY, " +
            "           T2.USER_ID USER_ID, " +
            "           NULL TOT_CNT, " +
            "           COUNT(*) DONE_CNT " +
            "    FROM DONE T1, " +
            "         USERS T2, " +
            "         CAL_INFO T3 " +
            "    WHERE T1.USER_ID = T2.USER_ID " +
            "      AND T1.DONE_DATE = T3.BASIS_YMD " +
            "    GROUP BY T3.YY, T2.USER_ID " +
            ") T1 " +
            "WHERE T1.USER_ID = :userId " +
            "GROUP BY T1.YY, T1.USER_ID", nativeQuery = true)
    List<Object[]> findYearlyStatsByUserId(@Param("userId") String userId);


    @Query(value = "WITH CAL_INFO AS ( " +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK " +
            "    FROM ( " +
            "        SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "        FROM information_schema.columns " +
            "    ) T1 " +
            "    WHERE T1.RNUM <= 365 " +
            "    ORDER BY 1 " +
            ") " +
            "SELECT T1.WK WK, " +
            "       T4.CATEGORY CATEGORY, " +
            "       COUNT(T3.CHECKLIST_ID) CATEGORY_COUNT, " +
            "       T2.USER_ID " +
            "FROM CAL_INFO T1, " +
            "     USERS T2, " +
            "     DONE T3, " +
            "     CHECKLIST T4 " +
            "WHERE 1=1 " +
            "  AND T1.BASIS_YMD = T3.DONE_DATE " +
            "  AND T2.USER_ID = T3.USER_ID " +
            "  AND T3.CHECKLIST_ID = T4.ID " +
            "  AND T3.USER_ID = :userId " +
            "AND T1.WK = WEEK(SYSDATE())" +
            "GROUP BY T1.WK, T2.USER_ID, T4.CATEGORY " +
            "ORDER BY WK, CATEGORY_COUNT DESC", nativeQuery = true)
    List<Object[]> findWeeklyCategoryStatsByUserId(@Param("userId") String userId);

    @Query(value = "WITH CAL_INFO AS ( " +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK, " +
            "           MONTH('20240101' + INTERVAL RNUM-1 DAY) MM " +
            "    FROM ( " +
            "        SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "        FROM information_schema.columns " +
            "    ) T1 " +
            "    WHERE T1.RNUM <= 365 " +
            "    ORDER BY 1 " +
            ") " +
            "SELECT T1.MM MM, " +
            "       T4.CATEGORY CATEGORY, " +
            "       COUNT(T3.CHECKLIST_ID) CATEGORY_COUNT, " +
            "       T2.USER_ID " +
            "FROM CAL_INFO T1, " +
            "     USERS T2, " +
            "     DONE T3, " +
            "     CHECKLIST T4 " +
            "WHERE 1=1 " +
            "  AND T1.BASIS_YMD = T3.DONE_DATE " +
            "  AND T2.USER_ID = T3.USER_ID " +
            "  AND T3.CHECKLIST_ID = T4.ID " +
            "  AND T3.USER_ID = :userId " +
            "AND T1.MM = MONTH(SYSDATE())" +
            "GROUP BY T1.MM, T2.USER_ID, T4.CATEGORY " +
            "ORDER BY MM, CATEGORY_COUNT DESC", nativeQuery = true)
    List<Object[]> findMonthlyCategoryStatsByUserId(@Param("userId") String userId);

    @Query(value = "WITH CAL_INFO AS ( " +
            "    SELECT '20240101' + INTERVAL RNUM-1 DAY BASIS_YMD, " +
            "           WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK, " +
            "           MONTH('20240101' + INTERVAL RNUM-1 DAY) MM, " +
            "           YEAR('20240101' + INTERVAL RNUM-1 DAY) YY " +
            "    FROM ( " +
            "        SELECT ROW_NUMBER() OVER(ORDER BY ordinal_position) RNUM " +
            "        FROM information_schema.columns " +
            "    ) T1 " +
            "    WHERE T1.RNUM <= 365 " +
            "    ORDER BY 1 " +
            ") " +
            "SELECT T1.YY YY, " +
            "       T4.CATEGORY CATEGORY, " +
            "       COUNT(T3.CHECKLIST_ID) CATEGORY_COUNT, " +
            "       T2.USER_ID " +
            "FROM CAL_INFO T1, " +
            "     USERS T2, " +
            "     DONE T3, " +
            "     CHECKLIST T4 " +
            "WHERE 1=1 " +
            "  AND T1.BASIS_YMD = T3.DONE_DATE " +
            "  AND T2.USER_ID = T3.USER_ID " +
            "  AND T3.CHECKLIST_ID = T4.ID " +
            "  AND T3.USER_ID = :userId " +
            "AND T1.YY = YEAR(SYSDATE())" +
            "GROUP BY T1.YY, T2.USER_ID, T4.CATEGORY " +
            "ORDER BY YY, CATEGORY_COUNT DESC", nativeQuery = true)
    List<Object[]> findYearlyCategoryStatsByUserId(@Param("userId") String userId);

    // 오늘 달성율
    @Query(value = "WITH CAL_INFO AS (" +
            "    SELECT DATE_ADD('2024-01-01', INTERVAL (RNUM-1) DAY) AS BASIS_YMD, " +
            "           WEEK(DATE_ADD('2024-01-01', INTERVAL (RNUM-1) DAY)) + 1 AS WK " +
            "    FROM (SELECT ROW_NUMBER() OVER(ORDER BY  ordinal_position ) RNUM " +
            "          FROM information_schema.columns) T1 " +
            "    WHERE RNUM <= 365 " +
            "    ORDER BY BASIS_YMD " +
            ") " +
            "SELECT " +
//            "       T1.DATEID, " +
//            "       T1.USER_ID, " +
//            "       SUM(T1.TOT_CNT) AS TOT_CNT, " +
//            "       SUM(T1.DONE_CNT) AS DONE_CNT, " +
            "       SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT) AS RATE " +
            "FROM ( " +
            "    SELECT T1.BASIS_YMD AS DATEID, " +
            "           T3.USER_ID, " +
            "           COUNT(*) AS TOT_CNT, " +
            "           NULL AS DONE_CNT " +
            "    FROM CAL_INFO T1 " +
            "    JOIN CHECKLIST T2 ON T1.BASIS_YMD >= T2.CREATED_AT " +
            "                      AND (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "    JOIN USERS T3 ON T2.USER_ID = T3.USER_ID " +
            "    GROUP BY T1.BASIS_YMD, T3.USER_ID " +
            "    UNION ALL " +
            "    SELECT T1.DONE_DATE AS DATEID, " +
            "           T2.USER_ID, " +
            "           NULL AS TOT_CNT, " +
            "           COUNT(*) AS DONE_CNT " +
            "    FROM DONE T1 " +
            "    JOIN USERS T2 ON T1.USER_ID = T2.USER_ID " +
            "    GROUP BY T1.DONE_DATE, T2.USER_ID " +
            ") T1 " +
            "WHERE T1.USER_ID = :userId " +
            "  AND T1.DATEID = :localDate " +
            "GROUP BY DATEID, USER_ID", nativeQuery = true)
    Double findDailyAchieveByUserId(@Param("userId") String userId, @Param("localDate") LocalDate localDate);

    // 오늘 적립금
    @Query(value = "WITH CAL_INFO AS " +
            "( " +
            "   SELECT '20240101' + INTERVAL RNUM-1 DAY  BASIS_YMD, " +
            "            WEEK('20240101' + INTERVAL RNUM-1 DAY) + 1 WK, " +
            "            MONTH('20240101' + INTERVAL RNUM-1 DAY) MM, " +
            "            YEAR('20240101' + INTERVAL RNUM-1 DAY) YY " +
            "   FROM    (   " +
            "            SELECT ROW_NUMBER() OVER(ORDER BY  ordinal_position ) RNUM " +
            "            FROM information_schema.columns " +
            "         ) T1 " +
            "   WHERE  T1.RNUM <= 365 " +
            "   ORDER BY  1 " +
            ") " +
            "SELECT " +
//            "       T1.DATEID, " +
//            "       T1.USER_ID, " +
//            "       SUM(T1.TOT_CNT) AS TOT_CNT, " +
//            "       SUM(T1.DONE_CNT) AS DONE_CNT, " +
//            "       SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT) AS RATE, " +
            "       (SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT)) * (T2.REWARD / DAY(LAST_DAY('2022-07-20'))) AS DAILY_REWARD " +
            "FROM ( " +
            "   SELECT T1.BASIS_YMD AS DATEID, " +
            "          T3.USER_ID AS USER_ID, " +
            "          COUNT(*) AS TOT_CNT, " +
            "          NULL AS DONE_CNT " +
            "   FROM CAL_INFO T1, " +
            "        CHECKLIST T2, " +
            "        USERS T3 " +
            "   WHERE 1 = 1 " +
            "   AND T1.BASIS_YMD >= T2.CREATED_AT " +
            "   AND (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "   AND T2.USER_ID = T3.USER_ID" +
            "   GROUP BY T1.BASIS_YMD, T3.USER_ID " +

            "   UNION ALL " +

            "   SELECT T1.DONE_DATE AS DATEID, " +
            "          T2.USER_ID AS USER_ID, " +
            "          NULL AS TOT_CNT, " +
            "          COUNT(*) AS DONE_CNT " +
            "   FROM DONE T1, " +
            "        USERS T2 " +
            "   WHERE T1.USER_ID = T2.USER_ID" +
            "   GROUP BY T1.DONE_DATE, T2.USER_ID " +
            ") T1, " +
            " ( " +
            "   SELECT * FROM REWARD T1 " +
            "   WHERE YEAR(T1.CREATED_AT) = YEAR(:localDate) " +
            "     AND MONTH(T1.CREATED_AT) = MONTH(:localDate) " +
            "   ORDER BY DAY(T1.CREATED_AT) DESC " +
            "   LIMIT 1 " +
            ") T2 " +
            "WHERE 1 = 1 " +
            "   AND T1.USER_ID = T2.USER_ID" +
            "   AND T1.USER_ID = :userId " +
            "   AND T1.DATEID = :localDate " +
            "GROUP BY T1.DATEID, T1.USER_ID, T2.REWARD ", nativeQuery = true)
    Double findDailySavedByUserId(@Param("userId") String userId, @Param("localDate") LocalDate localDate);

    // 또래 달성율 평균
    @Query(value = "SELECT AVG(T1.RATE) AVG " +
            "FROM ( " +
            "   WITH CAL_INFO AS " +
            "   ( " +
            "       SELECT '2024-01-01' + INTERVAL RNUM-1 DAY  BASIS_YMD, " +
            "                WEEK('2024-01-01' + INTERVAL RNUM-1 DAY) + 1 WK " +
            "       FROM    ( " +
            "                SELECT ROW_NUMBER() OVER(ORDER BY  ordinal_position ) RNUM " +
            "                FROM information_schema.columns " +
            "             ) T1 " +
            "       WHERE  T1.RNUM <= 365 " +
            "       ORDER BY  1 " +
            "   ) " +
            "   SELECT   T1.DATEID            DATEID        , " +
            "                T1.USER_ID           USER_ID     , " +
            "                SUM(T1.TOT_CNT)  TOT_CNT   , " +
            "                SUM(T1.DONE_CNT) DONE_CNT   , " +
            "                SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT)  RATE " +
            "       FROM   ( " +
            "                SELECT  T1.BASIS_YMD       DATEID      , " +
            "                        T3.USER_ID     USER_ID, " +
            "                        COUNT(*)   TOT_CNT   , " +
            "                        NULL      DONE_CNT " +
            "                FROM    CAL_INFO      T1, " +
            "                        CHECKLIST    T2, " +
            "                        USERS       T3 " +
            "                WHERE    1 = 1 " +
            "                AND      T1.BASIS_YMD >= T2.CREATED_AT " +
            "                AND      (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "                AND      T2.USER_ID = T3.USER_ID " +
            "                AND      YEAR(T3.BIRTH) BETWEEN YEAR(:birth) - 2 AND YEAR(:birth) + 2 " +
            "                GROUP BY T1.BASIS_YMD, T3.USER_ID " +
            "                UNION ALL " +
            "                SELECT   T1.DONE_DATE          DATEID       , " +
            "                         T2.USER_ID           USER_ID, " +
            "                         NULL           TOT_CNT    , " +
            "                         COUNT(*)       DONE_CNT " +
            "                FROM    DONE   T1, " +
            "                        USERS T2 " +
            "                WHERE T1.USER_ID = T2.USER_ID " +
            "                      AND YEAR(T2.BIRTH) BETWEEN YEAR(:birth) - 2 AND YEAR(:birth) + 2 " +
            "                GROUP BY T1.DONE_DATE, T2.USER_ID " +
            "             ) T1 " +
            "       WHERE        " +
            "             T1.DATEID = :localDate " +
            "       GROUP BY DATEID, USER_ID " +
            "   ) T1 " , nativeQuery = true)
    Double findDailyAchieveByAge(@Param("birth") LocalDate birth, @Param("localDate") LocalDate localDate);

    // 같은 성별 달성율 평균
    @Query(value = "SELECT AVG(T1.RATE) AVG " +
            "FROM ( " +
            "   WITH CAL_INFO AS " +
            "   ( " +
            "       SELECT '2024-01-01' + INTERVAL RNUM-1 DAY  BASIS_YMD, " +
            "                WEEK('2024-01-01' + INTERVAL RNUM-1 DAY) + 1 WK " +
            "       FROM    ( " +
            "                SELECT ROW_NUMBER() OVER(ORDER BY  ordinal_position ) RNUM " +
            "                FROM information_schema.columns " +
            "             ) T1 " +
            "       WHERE  T1.RNUM <= 365 " +
            "       ORDER BY  1 " +
            "   ) " +
            "   SELECT   T1.DATEID            DATEID        , " +
            "                T1.USER_ID           USER_ID     , " +
            "                SUM(T1.TOT_CNT)  TOT_CNT   , " +
            "                SUM(T1.DONE_CNT) DONE_CNT   , " +
            "                SUM(T1.DONE_CNT) / SUM(T1.TOT_CNT)  RATE " +
            "       FROM   ( " +
            "                SELECT  T1.BASIS_YMD       DATEID      , " +
            "                        T3.USER_ID     USER_ID, " +
            "                        COUNT(*)   TOT_CNT   , " +
            "                        NULL      DONE_CNT " +
            "                FROM    CAL_INFO      T1, " +
            "                        CHECKLIST    T2, " +
            "                        USERS       T3 " +
            "                WHERE    1 = 1 " +
            "                AND      T1.BASIS_YMD >= T2.CREATED_AT " +
            "                AND      (T1.BASIS_YMD <= T2.DELETED_AT OR T2.DELETED_AT IS NULL) " +
            "                AND      T2.USER_ID = T3.USER_ID " +
            "                AND      T3.GENDER = :gender " +
            "                GROUP BY T1.BASIS_YMD, T3.USER_ID " +
            "                UNION ALL " +
            "                SELECT   T1.DONE_DATE          DATEID       , " +
            "                         T2.USER_ID           USER_ID, " +
            "                         NULL           TOT_CNT    , " +
            "                         COUNT(*)       DONE_CNT " +
            "                FROM    DONE   T1, " +
            "                        USERS T2 " +
            "                WHERE T1.USER_ID = T2.USER_ID " +
            "                      AND T2.GENDER = :gender " +
            "                GROUP BY T1.DONE_DATE, T2.USER_ID " +
            "             ) T1 " +
            "       WHERE        " +
            "             T1.DATEID = :localDate " +
            "       GROUP BY DATEID, USER_ID " +
            "   ) T1 " , nativeQuery = true)
    Double findDailyAchieveByGender(@Param("gender") String gender, @Param("localDate") LocalDate localDate);

}
