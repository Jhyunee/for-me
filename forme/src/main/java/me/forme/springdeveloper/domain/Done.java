
package me.forme.springdeveloper.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(DoneId.class)
public class Done {

    @Id
    @Column(name = "checklistId", nullable = false)
    private Long checklistId;

    @Id
    @Column(name = "done_date")
    private LocalDate done_date;

    //사용자아이디
    @Id
    @Column(name = "user_id", nullable = false)
    private String user_id;

    @Builder
    public Done(Long checklistId, LocalDate done_date, String user_id) {
        this.checklistId = checklistId;
        this.done_date = done_date;
        this.user_id = user_id;
    }

}