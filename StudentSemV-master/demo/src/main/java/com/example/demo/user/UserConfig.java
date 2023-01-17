package com.example.demo.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner2(UserRespository repository)
    {
        return args -> {
            AppUser admin = new AppUser(
                    "admin",
                    "admin",
                    "admin@niepodam.pl"
            );

            AppUser Mikolaj = new AppUser(
                    "Mikolaj",
                    "admin",
                    "mikolaj@frankiewicz.dev"
            );

            repository.saveAll(
                    List.of(admin, Mikolaj)
            );
        };
    }
}
