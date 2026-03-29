from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# --------------------
# Load outdoor model
# --------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model_outdoor.pkl")

try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None  # prevents crashing on startup

# --------------------
# Input schema
# --------------------
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
    Farming_Experience: int   # ✅ NEW

# --------------------
# Optional: label mapping (if your model outputs numbers)
# --------------------
label_mapping = {
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
# App & CORS
# --------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# Predict endpoint
# --------------------
@app.post("/predict-outdoor")
def predict_outdoor(data: OutdoorData):
    if model is None:
        return JSONResponse(status_code=500, content={"error": "Model not loaded"})
    
    try:
        # Convert input to numpy array
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
        
        # Predict
        pred_raw = model.predict(values)[0]
        # Map to label if using numeric classes
        pred_label = label_mapping.get(pred_raw, str(pred_raw))
        
        # Return structured JSON
        return {
            "recommendation": pred_label,
            "description": f"Recommended crop: {pred_label}",
            "type": "outdoor",
            "video_id": pred_label
        }
    except Exception as e:
        print(f"Prediction error: {e}")
        return JSONResponse(status_code=500, content={"error": "Prediction failed", "details": str(e)})
