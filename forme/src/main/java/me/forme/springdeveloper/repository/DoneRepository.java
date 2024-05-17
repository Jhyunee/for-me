package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.domain.Done;
import me.forme.springdeveloper.domain.DoneId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface DoneRepository extends JpaRepository<Done, DoneId> {

    //donedate와 userid로 done 찾아서 반환
    @Query("SELECT c " +
            "FROM Done c " +
            "WHERE c.user_id = :user_id " +
            "AND c.done_date = :select_date")
    List<Done> findByUserAndDoneDate(@Param("user_id") String user_id, @Param("select_date") LocalDate dateTime);

}
