package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.ChecklistViewResponse;
import me.forme.springdeveloper.service.ChecklistService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ChecklistViewController {

    private final ChecklistService checklistService;

    @GetMapping("/checklists")
    public String getChecklist(Model model) {
        List<ChecklistViewResponse> checklist = checklistService.findAll()
                .stream()
                .map(ChecklistViewResponse::new)
                .toList();
        model.addAttribute("checklist", checklist);

        return "";
    }

}
