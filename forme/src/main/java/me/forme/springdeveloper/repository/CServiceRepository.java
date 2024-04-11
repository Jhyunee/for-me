package me.forme.springdeveloper.repository;

import me.forme.springdeveloper.domain.CService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CServiceRepository extends JpaRepository<CService, Long> { }
