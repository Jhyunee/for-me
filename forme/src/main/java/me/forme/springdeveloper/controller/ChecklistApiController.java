package me.forme.springdeveloper.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.domain.Done;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.dto.AddDoneRequest;
import me.forme.springdeveloper.dto.UpdateChecklistRequest;
import me.forme.springdeveloper.service.ChecklistService;
import me.forme.springdeveloper.service.FlaskClientService;
import me.forme.springdeveloper.service.GetUserIdFromTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@CrossOrigin
@RequiredArgsConstructor
@RestController
@Slf4j
public class ChecklistApiController {

    private final ChecklistService checklistService;
    private final GetUserIdFromTokenService getUserIdFromTokenService;
    private final FlaskClientService flaskClientService;


    //체크리스트 조회 (선택한 날짜)
    @GetMapping("/api/checklists")
    public Map<String, List<Checklist>> index(@RequestParam LocalDate select_date) {
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        return checklistService.getChecklistsByDate(select_date, userId);
    }

    //체크리스트 생성 (request dto에 user_id 전달 > token 전달로 수정 필요)
    @PostMapping("/api/checklists")
    public ResponseEntity<Checklist> addChecklist(@RequestBody AddChecklistRequest request) throws JsonProcessingException {
        //String userId = getUserIdFromTokenService.getUserIdFromToken();
        // Flask 모델에 checklist 데이터 전송
        flaskClientService.sendToFlaskAdd(request);
        // Springboot로 category 예측 결과 가져오기
        String category = flaskClientService.getTextFromFlaskServer().block(); // 비동기 작업 완료를 기다림

        request.setCategory(category);
        Checklist savedChecklist = checklistService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedChecklist);
    }

    //체크리스트 수정 (request dto에 user_id 전달 > token 전달로 수정 필요)
    @PatchMapping("/api/checklists")
    public ResponseEntity<Checklist> update(@RequestParam Long id,
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
    @PatchMapping("/api/checklists/delete")
    public ResponseEntity<Checklist> delete(@RequestParam Long id) {
        // 각 체크리스트 공유의 id가 있기 때문에 user_id 불필요
        Checklist deleted = checklistService.delete(id);
        return (deleted != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    //체크리스트 완료
    @PatchMapping("/api/checklists/check")
    public ResponseEntity<Checklist> done(@RequestBody AddDoneRequest request) {
        Done done = checklistService.done(request);
        return (done != null) ?
                ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
