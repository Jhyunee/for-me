package me.forme.springdeveloper.service;
// 유저별, 삭제기간 별
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.domain.Done;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.dto.AddDoneRequest;
import me.forme.springdeveloper.dto.ShowChecklistRequest;
import me.forme.springdeveloper.dto.UpdateChecklistRequest;

import me.forme.springdeveloper.repository.ChecklistRepository;
import me.forme.springdeveloper.repository.DoneRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;
    private final DoneRepository doneRepository;


    //체크리스트 조회 메서드 (done 적용 버전)
    public Map<String, List<Checklist>> getChecklistsByDate(ShowChecklistRequest request, String userId) {
        // 해당 날짜에 완료된 Done 엔티티 가져오기
        List<Done> doneList = doneRepository.findByUserAndDoneDate(userId, request.getSelect_date());

        // 완료된 체크리스트의 ID 목록 추출
        List<Long> doneChecklistIds = doneList.stream()
                .map(Done::getChecklistId)
                .collect(Collectors.toList());

        // 모든 체크리스트 가져오기
        List<Checklist> allChecklists = checklistRepository.findByUserAndDate(userId, request.getSelect_date());

        // 완료된 체크리스트와 완료되지 않은 체크리스트를 구분
        List<Checklist> doneChecklists = allChecklists.stream()
                .filter(checklist -> doneChecklistIds.contains(checklist.getId()))
                .collect(Collectors.toList());

        List<Checklist> notDoneChecklists = allChecklists.stream()
                .filter(checklist -> !doneChecklistIds.contains(checklist.getId()))
                .collect(Collectors.toList());

        // Map에 완료된 체크리스트와 완료되지 않은 체크리스트를 담아 반환
        Map<String, List<Checklist>> resultMap = new HashMap<>();
        resultMap.put("done", doneChecklists);
        resultMap.put("notDone", notDoneChecklists);

        return resultMap;
    }


    //체크리스트 추가 메서드
    public Checklist save(AddChecklistRequest request) {
        return checklistRepository.save(request.toEntity());
    }

    //체크리스트 수정 메서드
    @Transactional
    public Checklist update(Long id, UpdateChecklistRequest request) {
        Checklist checklist = checklistRepository.findById(id).orElse(null);
        if(checklist != null) {
            checklist.update(request.getName(), request.getUser_id(), LocalTime.now(), request.getCategory());
            checklistRepository.save(checklist);
        }
        return checklist;
    }

    //체크리스트 완료 표시하기 (done 이용)
    @Transactional
    public Done done(AddDoneRequest request) {
        Checklist checklist = checklistRepository.findById(request.getChecklistId()).orElse(null);
        Done done = Done.builder()
                .checklistId(request.getChecklistId())
                .done_date(request.getDone_date())
                .user_id(request.getUser_id())
                .build();
        // Done 객체를 저장
        doneRepository.save(done);
        return done;
    }


    //체크리스트 삭제 메서드
    public Checklist delete(Long id) {
        // 1. 대상 찾기
        Checklist target = checklistRepository.findById(id).orElse(null);
        // 2. 잘못된 요청 처리하기
        if (target == null) {
            return null;
        }
        // 3. 대상 삭제하기 (실제 테이블에서 삭제X, 삭제 날짜 설정)
        //checklistRepository.delete(target);
        target.delete(LocalDate.now());
        return target;
    }


    public Checklist findById(Long id) {
        return checklistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : "+ id));
    }


}