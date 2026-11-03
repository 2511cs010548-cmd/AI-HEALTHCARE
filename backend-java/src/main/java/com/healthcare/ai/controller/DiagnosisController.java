package com.healthcare.ai.controller;

import com.healthcare.ai.dto.PredictionResponse;
import com.healthcare.ai.dto.SymptomRequest;
import com.healthcare.ai.service.DiseasePredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows connections from React & HTML frontends
public class DiagnosisController {

    private final DiseasePredictionService predictionService;

    @Autowired
    public DiagnosisController(DiseasePredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", "UP");
        resp.put("framework", "Java Spring Boot 3");
        resp.put("message", "AI Healthcare Java Microservice is running smoothly");
        resp.put("version", "1.0.0-SNAPSHOT");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predictDisease(@RequestBody SymptomRequest request) {
        PredictionResponse response = predictionService.predict(request);
        return ResponseEntity.ok(response);
    }
}