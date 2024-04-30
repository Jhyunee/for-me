package me.forme.springdeveloper.service;

import lombok.RequiredArgsConstructor;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.Notice;
import me.forme.springdeveloper.dto.AddCServiceRequest;
import me.forme.springdeveloper.dto.AddNoticeRequest;
import me.forme.springdeveloper.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;

    public List<Notice> findAll() {return noticeRepository.findAll();}

    public Notice save(AddNoticeRequest request) {
        return noticeRepository.save(request.toEntity());
    }

    public Notice findById(long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
    }

    public void delete(long id) {
        noticeRepository.deleteById(id);
    }
}
