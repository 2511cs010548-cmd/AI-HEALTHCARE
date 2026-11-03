package com.healthcare.ai.dto;

import java.util.List;

public class PredictionResponse {
    private String disease;
    private String confidence;
    private String severity;
    private List<String> matchedSymptoms;
    private List<String> recommendations;
    private List<DifferentialItem> differentials;
    private int mewsScore;
    private String status;

    public PredictionResponse() {
    }

    public PredictionResponse(String disease, String confidence, String severity,
                              List<String> matchedSymptoms, List<String> recommendations,
                              List<DifferentialItem> differentials, int mewsScore) {
        this.disease = disease;
        this.confidence = confidence;
        this.severity = severity;
        this.matchedSymptoms = matchedSymptoms;
        this.recommendations = recommendations;
        this.differentials = differentials;
        this.mewsScore = mewsScore;
        this.status = "SUCCESS";
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public String getConfidence() {
        return confidence;
    }

    public void setConfidence(String confidence) {
        this.confidence = confidence;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public List<String> getMatchedSymptoms() {
        return matchedSymptoms;
    }

    public void setMatchedSymptoms(List<String> matchedSymptoms) {
        this.matchedSymptoms = matchedSymptoms;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<String> recommendations) {
        this.recommendations = recommendations;
    }

    public List<DifferentialItem> getDifferentials() {
        return differentials;
    }

    public void setDifferentials(List<DifferentialItem> differentials) {
        this.differentials = differentials;
    }

    public int getMewsScore() {
        return mewsScore;
    }

    public void setMewsScore(int mewsScore) {
        this.mewsScore = mewsScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
