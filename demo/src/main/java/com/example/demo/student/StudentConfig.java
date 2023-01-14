package com.example.demo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static java.time.Month.*;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository respository){
        return args -> {
            Student gniewko = new Student(
                    "Gniewko",
                    "gniewko@niepodam.pl",
                    LocalDate.of(2000, JANUARY, 5)
            );
            Student arturo = new Student(
                    "Arturo",
                    "arturo@niepodam.pl",
                    LocalDate.of(2004, JANUARY, 5)
            );
            respository.saveAll(
                    List.of(gniewko, arturo)
            );
        };
    }
}
