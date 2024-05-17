package me.forme.springdeveloper.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.domain.Done;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.dto.AddDoneRequest;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
import me.forme.springdeveloper.dto.UpdateChecklistRequest;
import me.forme.springdeveloper.service.ChecklistService;
import me.forme.springdeveloper.service.FlaskClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin
@RequiredArgsConstructor
@RestController
@Slf4j
public class ChecklistApiController {

    private final ChecklistService checklistService;

    private final FlaskClientService flaskClientService;

    //private LocalDate dateTime = LocalDate.now();

    //체크리스트 조회 (선택한 날짜)
    @GetMapping("/api/checklists")
    public Map<String, List<Checklist>> index(@RequestBody ShowChecklistRequest request) {
        return checklistService.getChecklistsByDate(request);
    }

    //체크리스트 생성
    @PostMapping("/api/checklists")
    public ResponseEntity<Checklist> addChecklist(@RequestBody AddChecklistRequest request) throws JsonProcessingException {

        // Flask 모델에 checklist 데이터 전송
        flaskClientService.sendToFlaskAdd(request);
        // Springboot로 category 예측 결과 가져오기
        String category = flaskClientService.getTextFromFlaskServer().block(); // 비동기 작업 완료를 기다림

        request.setCategory(category);
        Checklist savedChecklist = checklistService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedChecklist);
    }

    //체크리스트 수정
    @PatchMapping("/api/checklists/{id}")
    public ResponseEntity<Checklist> update(@PathVariable Long id,
                                            @RequestBody UpdateChecklistRequest dto) throws JsonProcessingException {

        flaskClientService.sendToFlaskUpdate(dto);
        String category = flaskClientService.getTextFromFlaskServer().block();
        dto.setCategory(category);

        Checklist updated = checklistService.update(id, dto);
        return (updated != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    //체크리스트 삭제
    @DeleteMapping("/api/checklists/{id}")
    public ResponseEntity<Checklist> delete(@PathVariable Long id) {
        Checklist deleted = checklistService.delete(id);
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    //체크리스트 완료
    @PatchMapping("/api/checklists/check/{id}")
    public ResponseEntity<Checklist> done(@PathVariable Long id, @RequestBody AddDoneRequest request) {
        Done done = checklistService.done(request);
        return (done != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
