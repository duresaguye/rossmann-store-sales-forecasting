"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import EDA from "./components/EDA";

export default function Home() {
  const [formData, setFormData] = useState({
    Store: "",
    DayOfWeek: "",
    Date: "",
    Customers: "",
    Open: "",
    Promo: "",
    StateHoliday: "",
    SchoolHoliday: "",
  });

  const [scaledPrediction, setScaledPrediction] = useState(null);
  const [originalPrediction, setOriginalPrediction] = useState(null);

  const minValue = 0.0; // Set the min value of your sales range
  const maxValue = 41551.0; // Set the max value of your sales range

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      // Convert formData to the correct types
      const data = {
        Store: parseInt(formData.Store, 10),
        DayOfWeek: parseInt(formData.DayOfWeek, 10),
        Date: formData.Date,
        Customers: parseInt(formData.Customers, 10),
        Open: parseInt(formData.Open, 10),
        Promo: parseInt(formData.Promo, 10),
        StateHoliday: formData.StateHoliday,
        SchoolHoliday: parseInt(formData.SchoolHoliday, 10),
      };

      const response = await axios.post("http://127.0.0.1:8000/predict", data);
      const prediction = response.data.predictions;

      // Assuming prediction is scaled, apply inverse scaling
      const originalSales = prediction * (maxValue - minValue) + minValue;

      // Set both predictions
      setScaledPrediction(prediction);
      setOriginalPrediction(originalSales);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <>
      <EDA />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Sales Prediction</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {Object.keys(formData).map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Predict
        </button>
      </form>
      {scaledPrediction !== null && originalPrediction !== null && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Prediction Results</h2>
          <p>
            <strong>Scaled Prediction:</strong> {scaledPrediction}
          </p>
          <p>
            <strong>Original Sales Prediction:</strong> ${originalPrediction.toFixed(2)}
          </p>
        </div>
      )}
      </div>
     
    </>
  );
}
