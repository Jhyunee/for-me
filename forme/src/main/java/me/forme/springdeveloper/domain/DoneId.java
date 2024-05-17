package me.forme.springdeveloper.domain;

import jakarta.persistence.Column;

import java.io.Serializable;
import java.time.LocalDate;

public class DoneId implements Serializable {
    @Column(name = "checklistId")
    private Long checklistId;
    @Column(name = "done_date")
    private LocalDate done_date;

    @Column(name = "user_id")
    private String user_id;
}
