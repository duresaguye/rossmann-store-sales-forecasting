from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import tensorflow as tf
import os
import joblib


app = FastAPI()
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"


# Get the absolute path to the model directory
model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), './sales_model'))

# Load the trained model using the SavedModel format
model = tf.keras.models.load_model(model_dir, compile=False)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class PredictionRequest(BaseModel):
    Store: int
    DayOfWeek: int
    Date: str
    Customers: int
    Open: int
    Promo: int
    StateHoliday: str
    SchoolHoliday: int

@app.get("/")
def read_root():
    return {"message": "Welcome to the Store Sales Prediction API!"}

@app.post("/predict")
def predict(request: PredictionRequest):
    # Convert request to DataFrame
    input_data = pd.DataFrame([request.dict()])

    # Preprocess the input data
    input_data['Date'] = pd.to_datetime(input_data['Date'])
    input_data['Year'] = input_data['Date'].dt.year
    input_data['Month'] = input_data['Date'].dt.month
    input_data['Day'] = input_data['Date'].dt.day
    input_data = input_data.drop(columns=['Date'])

    # Ensure all columns are numeric
    input_data = input_data.astype(float)

    # Pad the input data to match the expected number of features
    required_features = 14  # Adjust based on the model's requirements
    if input_data.shape[1] < required_features:
        padding = np.zeros((1, required_features - input_data.shape[1]))
        input_data = np.hstack([input_data.values, padding])

    # Reshape the input data to match the expected input shape of the model
    input_data = input_data.reshape((1, 7, 2))

    # Make predictions
    predictions = model.predict(input_data)

    # Return the predictions as a JSON response
    return {"predictions": predictions.tolist()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
#curl -X POST "http://127.0.0.1:8000/predict" -H "accept: application/json" -H "Content-Type: application/json" -d '{"Store": 1, "DayOfWeek": 5, "Date": "2015-07-31", "Customers": 555, "Open": 1, "Promo": 1, "StateHoliday": "0", "SchoolHoliday": 1}'
