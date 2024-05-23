package me.forme.springdeveloper.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatisticCategoryCountResponse {
    private int ymd;
    private String category;
    private int category_count;
    private String user_id;

    public StatisticCategoryCountResponse(int ymd, String category, int category_count, String user_id) {
        this.ymd = ymd;
        this.category = category;
        this.category_count = category_count;
        this.user_id = user_id;
    }
}
