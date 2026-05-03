from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

# --------------------
# Load models & assets
# --------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Indoor model
indoor_model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))

# Outdoor model
try:
    outdoor_model = joblib.load(os.path.join(BASE_DIR, "model_outdoor.pkl"))
    scaler_outdoor = joblib.load(os.path.join(BASE_DIR, "scaler_outdoor.pkl"))
    label_mapping_outdoor = joblib.load(
        os.path.join(BASE_DIR, "label_mapping_outdoor.pkl")
    )
except Exception as e:
    print(f"Error loading outdoor assets: {e}")
    outdoor_model = None
    scaler_outdoor = None
    label_mapping_outdoor = None

# --------------------
# Indoor labels (unchanged)
# --------------------
indoor_labels = {
    0: "aeroponics",
    1: "aquaponics",
    2: "hydroponics"
}

# --------------------
# Schemas
# --------------------
class IndoorData(BaseModel):
    Space_Size: int
    Power_Reliability: int
    Lighting: int
    Water_Accessibility: int
    Water_Chemistry: int
    Temperature_Control: int
    Ventilation: int
    Budget: int
    Time_Available: int
    Noise_Tolerance: int
    Biosecurity: int
    Nutrient_Source: int
    Aquaculture: int
    Purpose: int
    Experience: int


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

# Serve PDFs
# app.mount("/pdfs", StaticFiles(directory="pdfs"), name="pdfs")

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
        data.Space_Size,
        data.Power_Reliability,
        data.Lighting,
        data.Water_Accessibility,
        data.Water_Chemistry,
        data.Temperature_Control,
        data.Ventilation,
        data.Budget,
        data.Time_Available,
        data.Noise_Tolerance,
        data.Biosecurity,
        data.Nutrient_Source,
        data.Aquaculture,
        data.Purpose,
        data.Experience
    ]])

    pred = indoor_model.predict(values)[0]
    method = indoor_labels.get(pred, str(pred))

    return {
        "recommendation": method,
        "description": f"{method.capitalize()} is suitable based on your inputs.",
        "type": "indoor",
        "video_id": method
    }


# --------------------
# Outdoor prediction (FIXED)
# --------------------
@app.post("/predict-outdoor")
def predict_outdoor(data: OutdoorData):
    if outdoor_model is None or scaler_outdoor is None or label_mapping_outdoor is None:
        return JSONResponse(
            status_code=500,
            content={"error": "Outdoor model assets not loaded"}
        )
    
    try:
        # Build feature array
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

        # ✅ Apply scaler (VERY IMPORTANT)
        values = scaler_outdoor.transform(values)

        # Predict
        pred = outdoor_model.predict(values)[0]

        # ✅ Decode using saved mapping
        label = label_mapping_outdoor.get(pred, str(pred))

        return {
            "recommendation": label,
            "description": f"Recommended category: {label}",
            "type": "outdoor",
            "video_id": label
        }

    except Exception as e:
        print(f"Prediction error: {e}")
        return JSONResponse(
            status_code=500,
            content={"error": "Prediction failed"}
        )