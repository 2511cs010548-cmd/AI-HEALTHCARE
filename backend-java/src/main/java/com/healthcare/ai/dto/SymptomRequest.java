package com.healthcare.ai.dto;

import java.util.List;

public class SymptomRequest {
    private List<String> symptoms;
    private int age;
    private String gender;
    private String duration;
    private double temperature;

    public SymptomRequest() {
    }

    public SymptomRequest(List<String> symptoms, int age, String gender) {
        this.symptoms = symptoms;
        this.age = age;
        this.gender = gender;
    }

    public List<String> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }
}
