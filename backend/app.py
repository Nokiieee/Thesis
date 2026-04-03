from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# --------------------
# Load models
# --------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

indoor_model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))

try:
    outdoor_model = joblib.load(os.path.join(BASE_DIR, "model_outdoor.pkl"))
except Exception as e:
    print(f"Error loading outdoor model: {e}")
    outdoor_model = None

# --------------------
# Label mappings
# --------------------
indoor_labels = {
    0: "aeroponics",
    1: "aquaponics",
    2: "hydroponics"
}

outdoor_labels = {
    0: "ampalaya",
    1: "eggplant",
    2: "hot pepper",
    3: "okra",
    4: "patola",
    5: "sitao",
    6: "squash",
    7: "tomato",
    8: "upo"
}

# --------------------
# Schemas
# --------------------
class IndoorData(BaseModel):
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


class OutdoorData(BaseModel):
    Space_Size: int
    Soil_Type: int
    Sunlight: int
    Water_Availability: int
    Watering_Frequency: int
    Flood_Risk: int
    Temperature: int
    Budget: int
    Time_Available: int
    Pest_Level: int
    Drainage: int
    Fertilizer_Access: int
    Wind_Exposure: int
    Planting_Purpose: int
    Farming_Experience: int


# --------------------
# App & CORS
# --------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# Indoor prediction
# --------------------
@app.post("/predict-indoor")
def predict_indoor(data: IndoorData):
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

    pred = indoor_model.predict(values)[0]
    method = indoor_labels[pred]

    return {
        "recommendation": method,
        "description": f"{method.capitalize()} is suitable based on your inputs.",
        "type": "indoor",
        "video_id": method
    }


# --------------------
# Outdoor prediction
# --------------------
@app.post("/predict-outdoor")
def predict_outdoor(data: OutdoorData):
    if outdoor_model is None:
        return JSONResponse(status_code=500, content={"error": "Outdoor model not loaded"})
    
    try:
        values = np.array([[ 
            data.Space_Size,
            data.Soil_Type,
            data.Sunlight,
            data.Water_Availability,
            data.Watering_Frequency,
            data.Flood_Risk,
            data.Temperature,
            data.Budget,
            data.Time_Available,
            data.Pest_Level,
            data.Drainage,
            data.Fertilizer_Access,
            data.Wind_Exposure,
            data.Planting_Purpose,
            data.Farming_Experience
        ]])

        pred = outdoor_model.predict(values)[0]
        label = outdoor_labels.get(pred, str(pred))

        return {
            "recommendation": label,
            "description": f"Recommended crop: {label}",
            "type": "outdoor",
            "video_id": label
        }

    except Exception as e:
        print(f"Prediction error: {e}")
        return JSONResponse(status_code=500, content={"error": "Prediction failed"})