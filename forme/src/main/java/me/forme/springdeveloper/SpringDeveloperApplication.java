package me.forme.springdeveloper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SpringDeveloperApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringDeveloperApplication.class, args);
	}

}
