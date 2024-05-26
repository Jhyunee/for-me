package me.forme.springdeveloper.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.forme.springdeveloper.domain.CService;
import me.forme.springdeveloper.domain.User;
import me.forme.springdeveloper.dto.AddCServiceRequest;
import me.forme.springdeveloper.dto.CServiceResponse;
import me.forme.springdeveloper.dto.UpdateCServiceRequest;
import me.forme.springdeveloper.service.CServiceService;
import me.forme.springdeveloper.service.GetUserIdFromTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class CServiceApiController {

    private final CServiceService cServiceService;

    private final GetUserIdFromTokenService getUserIdFromTokenService;

    // 고객센터 글 목록 조회
    @GetMapping("/api/mypage/services")
    public List<CService> findAllServices(){
        return cServiceService.findAll();
    }

    // 고객센터 글 (1개) 조회
    @GetMapping("/api/mypage/services/{id}")
    public ResponseEntity<CServiceResponse> findService(@PathVariable long id) {
        CService service = cServiceService.findById(id);

        return ResponseEntity.ok()
                .body(new CServiceResponse(service));
    }

    // 고객센터 글 등록
    @PostMapping("/api/mypage/services")
    public ResponseEntity<CService> addService(@RequestBody AddCServiceRequest request) {
        String userId = getUserIdFromTokenService.getUserIdFromToken();
        //log.info(principal.getName());
        CService savedService = cServiceService.save(request, userId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedService);
    }

    // 고객센터 글 삭제
    @DeleteMapping("/api/mypage/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable long id) {
        cServiceService.delete(id);

        return ResponseEntity.ok()
                .build();
    }

    // 고객센터 글 수정
    @PatchMapping("/api/mypage/services/{id}")
    public ResponseEntity<CService> updateService(@PathVariable long id, @RequestBody UpdateCServiceRequest request) {
        CService updatedService = cServiceService.update(id, request);

        return (updatedService != null) ?
                ResponseEntity.status(HttpStatus.OK).body(updatedService) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
