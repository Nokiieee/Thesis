from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))

# Your class label mapping
label_mapping = {
    0: "aeroponics",
    1: "aquaponics",
    2: "hydroponics"
}

# Input schema (must match your 15 features)
class FarmingData(BaseModel):
    avg_temp: int
    humidity_control: int
    available_space: int
    access_to_water: int
    power_availability: int
    capital_budget: int
    tech_comfort_level: int
    training_experience: int
    daily_time_commitment: int
    interest_in_fish: int
    pH_monitoring: int
    sustainability_interest: int
    goal_type: int
    lighting_setup: int
    ventilation_quality: int

app = FastAPI()

# ✅ Enable CORS so React can access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Convert goal int → indoor/outdoor string
def data_goal_to_type(goal: int):
    return "indoor" if goal == 0 else "indoor"  # you can improve mapping later

@app.post("/predict")
def predict(data: FarmingData):
    values = np.array([[ 
        data.avg_temp,
        data.humidity_control,
        data.available_space,
        data.access_to_water,
        data.power_availability,
        data.capital_budget,
        data.tech_comfort_level,
        data.training_experience,
        data.daily_time_commitment,
        data.interest_in_fish,
        data.pH_monitoring,
        data.sustainability_interest,
        data.goal_type,
        data.lighting_setup,
        data.ventilation_quality
    ]])

    pred = model.predict(values)[0]
    method = label_mapping[pred]

    # ✅ Return full structured response
    return {
        "recommendation": method,
        "description": f"{method.capitalize()} is suitable based on your inputs.",
        "type": data_goal_to_type(data.goal_type),
        "video_id": method  # normalized key
    }

