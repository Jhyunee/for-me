package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.AddCServiceRequest;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.dto.UpdateChecklistRequest;
import me.forme.springdeveloper.service.ChecklistService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class ChecklistApiController {

    private final ChecklistService checklistService;

    //체크리스트 조회
    @GetMapping("/api/checklists")
    public List<Checklist> index() {
        return checklistService.findAll();
    }

    //체크리스트 등록
    @PostMapping("/api/checklists")
    public ResponseEntity<Checklist> addChecklist(@RequestBody AddChecklistRequest request) {
        Checklist savedChecklist = checklistService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedChecklist);
    }

    //체크리스트 수정
    @PatchMapping("/api/checklists/{id}")
    public ResponseEntity<Checklist> update(@PathVariable Long id,
                                            @RequestBody UpdateChecklistRequest dto){
        Checklist updated = checklistService.update(id, dto);
        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    //체크리스트 삭제
    @DeleteMapping("/api/checklists/{id}")
    public ResponseEntity<Checklist> delete(@PathVariable Long id){
        Checklist deleted = checklistService.delete(id);
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    //체크리스트 완료
    @PatchMapping("/api/checklists/check/{id}")
    public ResponseEntity<Checklist> check(@PathVariable Long id) {
        Checklist checked = checklistService.check(id);
        return (checked != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
