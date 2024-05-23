package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
            "SELECT T1.WK ymd, " +
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
            "GROUP BY T1.YY, T2.USER_ID, T4.CATEGORY " +
            "ORDER BY YY, CATEGORY_COUNT DESC", nativeQuery = true)
    List<Object[]> findYearlyCategoryStatsByUserId(@Param("userId") String userId);
}
