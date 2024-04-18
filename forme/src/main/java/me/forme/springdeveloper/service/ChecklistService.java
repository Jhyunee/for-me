package me.forme.springdeveloper.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.dto.UpdateChecklistRequest;
import me.forme.springdeveloper.repository.ChecklistRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    public List<Checklist> findAll() {
        return checklistRepository.findAll();
    }

    public List<Checklist> findByDate(LocalDate dateTime) {
        return checklistRepository.findByCreatedAt(dateTime);
    }

    //체크리스트 조회 메서드
    public List<Checklist> index() {
        return checklistRepository.findAll();
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
            checklist.update(request.getName(), request.getUser_id(), LocalTime.now());
            checklistRepository.save(checklist);
        }
        return checklist;
    }

    @Transactional
    public Checklist check(Long id) {
        Checklist checklist = checklistRepository.findById(id).orElse(null);
        if(checklist != null) {
            checklist.check();
            checklistRepository.save(checklist);
        }
        return checklist;
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
