package com.healthcare.ai.dto;

public class DifferentialItem {
    private String disease;
    private int probability;
    private String riskLevel;
    private String rationale;

    public DifferentialItem() {
    }

    public DifferentialItem(String disease, int probability, String riskLevel, String rationale) {
        this.disease = disease;
        this.probability = probability;
        this.riskLevel = riskLevel;
        this.rationale = rationale;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public int getProbability() {
        return probability;
    }

    public void setProbability(int probability) {
        this.probability = probability;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getRationale() {
        return rationale;
    }

    public void setRationale(String rationale) {
        this.rationale = rationale;
    }
}
