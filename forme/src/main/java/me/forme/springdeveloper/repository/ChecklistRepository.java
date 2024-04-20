package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.ChecklistViewResponse;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

    @Query("SELECT c " +
            "FROM Checklist c " +
            "WHERE c.user_id = :user_id " +
            "AND c.createdAt <= :select_date AND (c.deletedAt IS NULL OR c.deletedAt > :select_date)")
    List<Checklist> findByUserAndDeleteDate2(@Param("user_id") String user_id, @Param("select_date") LocalDate dateTime);



}
