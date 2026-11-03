package com.healthcare.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * AI Healthcare Clinical Diagnosis & Telemedicine System
 * Main Spring Boot Application Entry Point for College Project Evaluation.
 */
@SpringBootApplication
public class AiHealthcareApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiHealthcareApplication.class, args);
        System.out.println("==========================================================");
        System.out.println("AI Healthcare Java Backend Server Started Successfully!");
        System.out.println("Port: 8080");
        System.out.println("REST API Endpoint: POST http://localhost:8080/api/predict");
        System.out.println("Health Check:      GET  http://localhost:8080/api/health");
        System.out.println("==========================================================");
    }
}
