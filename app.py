from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

# Initialize FastAPI App
app = FastAPI(
    title="AI Healthcare Disease Predictor API",
    description="Backend API for college project disease prediction from symptoms",
    version="1.0.0"
)

# Enable CORS for all origins so HTML frontend can connect easily
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Input Schema
class SymptomRequest(BaseModel):
    symptoms: List[str] = Field(
        ...,
        example=["fever", "headache", "body pain"],
        description="List of symptoms reported by the patient"
    )
    age: Optional[int] = Field(25, ge=0, le=120)
    gender: Optional[str] = Field("Male")


# Output Schema
class PredictionResponse(BaseModel):
    disease: str
    confidence: str
    matched: List[str]
    recommendations: List[str]
    severity: str


# GET / home route
@app.get("/")
def home():
    return {
        "status": "online",
        "message": "AI Healthcare Disease Prediction API is running successfully!",
        "endpoint": "POST /predict",
        "sample_input": {
            "symptoms": ["fever", "headache", "body pain"],
            "age": 25,
            "gender": "Male"
        }
    }


# POST /predict route
@app.post("/predict", response_model=PredictionResponse)
def predict(data: SymptomRequest):
    # Normalize symptoms: lowercase and strip spaces
    cleaned = {s.strip().lower() for s in data.symptoms if s and isinstance(s, str)}

    # Condition 1: fever + headache + body pain -> Dengue Fever 87%
    cond1 = {"fever", "headache", "body pain"}

    # Condition 2: fever + cough + sore throat -> Common Cold 92%
    cond2 = {"fever", "cough", "sore throat"}

    # Condition 3: headache + dizziness -> Migraine 80%
    cond3 = {"headache", "dizziness"}

    if cond1.issubset(cleaned):
        return PredictionResponse(
            disease="Dengue Fever",
            confidence="87%",
            matched=["Fever", "Headache", "Body Pain", "Nausea", "Fatigue"],
            recommendations=[
                "Consult doctor immediately",
                "Drink water & ORS to prevent dehydration",
                "CBC test (complete blood count) for platelet monitoring",
                "Complete bed rest and avoid self-medicating"
            ],
            severity="High"
        )
    elif cond2.issubset(cleaned):
        return PredictionResponse(
            disease="Common Cold",
            confidence="92%",
            matched=["Fever", "Cough", "Sore Throat"],
            recommendations=[
                "Drink warm fluids & herbal tea with honey",
                "Rest and sleep well to aid recovery",
                "Steam inhalation & saline nasal drops",
                "Consult doctor if fever persists > 4 days"
            ],
            severity="Mild"
        )
    elif cond3.issubset(cleaned):
        return PredictionResponse(
            disease="Migraine",
            confidence="80%",
            matched=["Headache", "Dizziness"],
            recommendations=[
                "Rest in a dark and quiet room",
                "Stay hydrated and avoid bright screens",
                "Apply cold compress on forehead",
                "Consult neurologist if attacks are frequent"
            ],
            severity="Moderate"
        )
    else:
        # Fallback condition: Viral Infection 78%
        matched_list = [s.strip().title() for s in data.symptoms if s.strip()]
        return PredictionResponse(
            disease="Viral Infection",
            confidence="78%",
            matched=matched_list if matched_list else ["General viral symptoms"],
            recommendations=[
                "Drink fluids and stay well hydrated",
                "Take adequate bed rest",
                "Monitor temperature regularly",
                "Consult physician if fever persists > 3 days"
            ],
            severity="Mild to Moderate"
        )


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
