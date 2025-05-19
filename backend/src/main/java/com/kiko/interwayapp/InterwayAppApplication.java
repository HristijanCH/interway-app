package com.kiko.interwayapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class InterwayAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(InterwayAppApplication.class, args);
    }

}
