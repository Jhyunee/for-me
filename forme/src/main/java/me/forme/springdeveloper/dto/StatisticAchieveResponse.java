package me.forme.springdeveloper.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatisticAchieveResponse {
    private int ymd;
    private String user_id;
    private long tot_cnt;
    private long done_cnt;
    private double rate;

    public StatisticAchieveResponse(int ymd, String user_id, long tot_cnt, long done_cnt, double rate) {
        this.ymd = ymd;
        this.user_id = user_id;
        this.tot_cnt = tot_cnt;
        this.done_cnt = done_cnt;
        this.rate = rate;
    }
}
