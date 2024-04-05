package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.Checklist;
import me.forme.springdeveloper.dto.AddChecklistRequest;
import me.forme.springdeveloper.repository.ChecklistRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    //블로그 글 추가 메서드
    public Checklist save(AddChecklistRequest request) {
        return checklistRepository.save(request.toEntity());
    }
}
