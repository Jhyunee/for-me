package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.Notice;
import me.forme.springdeveloper.dto.AddCServiceRequest;
import me.forme.springdeveloper.dto.AddNoticeRequest;
import me.forme.springdeveloper.dto.CServiceResponse;
import me.forme.springdeveloper.dto.NoticeResponse;
import me.forme.springdeveloper.repository.NoticeRepository;
import me.forme.springdeveloper.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class NoticeApiController {
    private final NoticeService noticeService;

    // 모든 공지글 조회
    @GetMapping("/api/mypage/notices")
    public List<Notice> findAllNotices(){
        return noticeService.findAll();
    }

    // 공지글 하나만 조회
    @GetMapping("/api/mypage/notices")
    public ResponseEntity<NoticeResponse> findNotice(@RequestParam long id) {
        Notice notice = noticeService.findById(id);
        return ResponseEntity.ok()
                .body(new NoticeResponse(notice));
    }

    // 공지글 등록
    @PostMapping("/api/mypage/notices")
    public ResponseEntity<Notice> addNotice(@RequestBody AddNoticeRequest request) {
        Notice savedNotice = noticeService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedNotice);
    }

    // 공지글 삭제
    @DeleteMapping("/api/mypage/notices")
    public ResponseEntity<Void> deleteService(@RequestParam long id) {
        noticeService.delete(id);

        return ResponseEntity.ok()
                .build();
    }

}
