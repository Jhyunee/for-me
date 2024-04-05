package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.repository.ChecklistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    //체크리스트 조회 메서드
    public List<Checklist> index() {
        return checklistRepository.findAll();
    }

    //체크리스트 추가 메서드
    public Checklist save(AddChecklistRequest request) {
        return checklistRepository.save(request.toEntity());
    }

    //체크리스트 수정 메서드
    public Checklist update(Long id, AddChecklistRequest dto) {
        // 1. DTO -> 엔티티 변환
        Checklist checklist = dto.toEntity();
        // 2. 타깃 조회하기
        Checklist target = checklistRepository.findById(id).orElse(null);
        // 3. 잘못된 요청 처리하기
        if (target == null || id != checklist.getId()){
            return null; // 응답은 컨트롤러가 하므로 여기서는 null 반환
        }
        // 4. 업데이트 및 정상 응답(200)하기
        Checklist updated = checklistRepository.save(checklist);
        return updated;


    }

    //체크리스트 삭제 메서드
    public Checklist delete(Long id) {
        // 1. 대상 찾기
        Checklist target = checklistRepository.findById(id).orElse(null);
        // 2. 잘못된 요청 처리하기
        if (target == null) {
            return null;
        }
        // 3. 대상 삭제하기
        checklistRepository.delete(target);
        return target;
    }
}
