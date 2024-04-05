package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.service.ChecklistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChecklistApiController {

    private final ChecklistService checklistService;

    //블로그 생성
    @PostMapping("/api/checklists")
    public ResponseEntity<Checklist> addChecklist(@RequestBody AddChecklistRequest request) {
        Checklist savedChecklist = checklistService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedChecklist);
    }
}
