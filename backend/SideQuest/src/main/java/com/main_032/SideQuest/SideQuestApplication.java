package com.main_032.SideQuest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SideQuestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SideQuestApplication.class, args);
	}

}
