package com.healthcare.ai.service;

import com.healthcare.ai.dto.DifferentialItem;
import com.healthcare.ai.dto.PredictionResponse;
import com.healthcare.ai.dto.SymptomRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DiseasePredictionService {

    public PredictionResponse predict(SymptomRequest request) {
        List<String> rawSymptoms = request.getSymptoms() != null ? request.getSymptoms() : Collections.emptyList();
        Set<String> clean = rawSymptoms.stream()
                .map(String::trim)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());

        String primaryDisease;
        String confidence;
        String severity;
        List<String> matched = new ArrayList<>();
        List<String> recommendations = new ArrayList<>();
        List<DifferentialItem> differentials = new ArrayList<>();
        int mewsScore = 2;

        if (clean.contains("fever") && clean.contains("headache") && clean.contains("body pain")) {
            primaryDisease = "Dengue Fever";
            confidence = "87%";
            severity = "High";
            matched = Arrays.asList("Fever", "Headache", "Body Pain", "Nausea", "Fatigue");
            recommendations = Arrays.asList(
                    "Consult a physician immediately for confirmation blood test (CBC Platelets).",
                    "Hydrate heavily with ORS electrolytes and clean fluids (minimum 2.5-3.0 L/day).",
                    "Take Paracetamol for fever management under medical advice.",
                    "Avoid self-medicating with NSAIDs like Aspirin or Ibuprofen."
            );
            differentials = Arrays.asList(
                    new DifferentialItem("Dengue Fever (Probable)", 87, "High", "Classic triad of continuous fever, retro-orbital headache, and severe myalgia."),
                    new DifferentialItem("Typhoid (Enteric Fever)", 44, "Moderate", "Step-ladder fever pattern with gastrointestinal discomfort."),
                    new DifferentialItem("Chikungunya Viral Infection", 38, "Moderate", "Severe debilitating arthralgia with physical fatigue.")
            );
            mewsScore = 4;
        } else if (clean.contains("fever") && (clean.contains("cough") || clean.contains("sore throat"))) {
            primaryDisease = "Acute Respiratory Infection";
            confidence = "92%";
            severity = "Mild";
            matched = Arrays.asList("Fever", "Cough", "Sore Throat", "Fatigue");
            recommendations = Arrays.asList(
                    "Drink warm herbal infusions with honey and lemon.",
                    "Take saline steam inhalation twice daily.",
                    "Ensure adequate rest and monitor temperature."
            );
            differentials = Arrays.asList(
                    new DifferentialItem("Upper Respiratory Tract Infection", 92, "Low", "Nasopharyngeal irritation with clear lung sounds."),
                    new DifferentialItem("Allergic Sinusitis", 35, "Low", "Mucosal inflammation without purulent drainage.")
            );
            mewsScore = 1;
        } else if (clean.contains("headache") && clean.contains("dizziness")) {
            primaryDisease = "Migraine with Aura";
            confidence = "80%";
            severity = "Moderate";
            matched = Arrays.asList("Headache", "Dizziness", "Fatigue");
            recommendations = Arrays.asList(
                    "Rest in a dark and soundproof room away from digital screens.",
                    "Apply a cool compress over forehead and temples.",
                    "Stay properly hydrated and avoid dietary migraine triggers."
            );
            differentials = Arrays.asList(
                    new DifferentialItem("Migraine Episode", 80, "Moderate", "Unilateral pulsatile pain with neurovascular sensitivity."),
                    new DifferentialItem("Tension Headache", 48, "Low", "Bilateral band pressure exacerbated by mental stress.")
            );
            mewsScore = 1;
        } else {
            primaryDisease = "General Viral Febrile Syndrome";
            confidence = "75%";
            severity = "Mild to Moderate";
            matched = rawSymptoms.stream()
                    .map(s -> s.substring(0, 1).toUpperCase() + s.substring(1))
                    .collect(Collectors.toList());
            recommendations = Arrays.asList(
                    "Maintain active oral hydration with electrolyte solutions.",
                    "Get complete rest for 48 hours.",
                    "Visit hospital outpatient department if symptoms escalate."
            );
            differentials = Arrays.asList(
                    new DifferentialItem("Viral Syndrome", 75, "Moderate", "Systemic immune response to airborne viral exposure."),
                    new DifferentialItem("Seasonal Fatigue", 30, "Low", "Physical exhaustion with transient temperature elevation.")
            );
            mewsScore = 2;
        }

        return new PredictionResponse(
                primaryDisease,
                confidence,
                severity,
                matched,
                recommendations,
                differentials,
                mewsScore
        );
    }
}
