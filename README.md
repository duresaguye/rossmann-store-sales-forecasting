# Rossmann Store Sales Forecasting

## Project Overview

This project focuses on analyzing and forecasting daily sales for Rossmann stores. By leveraging historical sales data, promotions, and other influencing factors, we aim to build predictive models to assist store managers in making informed decisions. These forecasts enable better inventory management, staffing, and strategic planning.

### About Rossmann
Rossmann, one of Germany's largest drugstore chains, operates over 3,000 stores across 7 European countries. Accurately forecasting daily sales is crucial to its operations. This project uses machine learning techniques to predict sales up to six weeks in advance, considering factors such as:

- Promotions
- Competition
- Holidays
- Seasonality
- Locality

## Repository Structure

```
root/
├── app/
│   ├── main.py               # API for real-time sales predictions (built using FastAPI)
│   ├── sales_model/          # Machine learning models and utilities
│── dashboard/            # Dashboard developed with Next.js for visualization
├── models/
│   └── prediction_of_sales_analysis.ipynb # EDA, model training, and evaluation
|____notebooks  #EDA and data preprocessing and feature engineering
├── scripts/                  
├── data/                      # Directory for raw and processed data files (not included)
├── models/                    # Saved trained models (optional)
├── README.md                  # Project overview and instructions
├── requirements.txt           # List of required Python packages
```

## Getting Started

### Prerequisites

- Ensure Python 3.7 or higher is installed.
- Install the required packages:

```bash
pip install -r requirements.txt
```

### Data

The dataset is not included in this repository due to size constraints. You can download it from the [Kaggle Rossmann Store Sales competition](https://www.kaggle.com/competitions/rossmann-store-sales/data). After downloading, place the CSV files in the `data/` directory.

### Running the Analysis

1. **Data Exploration and Preprocessing:**
   - Use the Jupyter notebooks in the `notebooks/` directory for initial data exploration and preprocessing.
   -

2. **Model Training:**
   - Run the notebooks to train predictive models.
   - Evaluate model performance using metrics like Mean Absolute Percentage Error (MAPE).

3. **Prediction:**
   - Utilize the trained models via `app/main.py` for real-time predictions.
   - Compare predicted sales with actual sales using analysis in the provided notebooks.

## Project Highlights

### Exploratory Data Analysis (EDA)

- Analyzed the distribution of promotions between training and test sets.
- Investigated sales behavior before, during, and after holidays.
- Identified seasonal purchasing patterns, such as spikes during Christmas and Easter.

### Feature Engineering

- Examined the correlation between sales and customer counts.
- Evaluated the impact of promotions on new and returning customers.
- Analyzed the influence of store assortment types on sales.
- Studied the effects of competitor proximity and new competitor openings.

### Modeling

- Implemented various machine learning models, including:
  - Linear Regression
  - Decision Trees
  - Random Forests
  - XGBoost
- Performed hyperparameter tuning for optimal performance.
- Selected the best-performing model based on evaluation metrics.

### Deep Learning Model

Deep Learning techniques are applied to predict future sales using a Long Short Term Memory (LSTM) model, a type of Recurrent Neural Network (RNN). Below is the process:

1. **Time Series Preparation:**
   - Isolate the Rossmann Store Sales dataset into time series data.
   - Check if the time series data is stationary.
   - Apply differencing if needed to make the data stationary.
   - Check for autocorrelation and partial autocorrelation to understand dependencies.
   - Transform the data into supervised learning format using a sliding window approach.

2. **Data Scaling:**
   - Scale the time series data to the range (-1, 1) for better performance.

3. **Model Building:**
   - Use TensorFlow or PyTorch to build a two-layer LSTM regression model.
   - Train the model in Google Colab to predict the next sales values.

4. **Evaluation:**
   - Validate the model's predictions against actual sales.
   - Achieved RMSE: **1044.689181657305**

### Real-Time Prediction and Visualization

- Developed an API in `app/main.py` using FastAPI for real-time sales predictions.
- Created a dashboard using Next.js to visualize sales forecasts.
- Integrated API calls for real-time predictions, allowing dynamic updates to the dashboard.



### Contribution
Feel free to fork this repository, open issues, or submit pull requests for improvements or bug fixes. Collaboration is always welcome!

### License
This project is licensed under the [MIT License](LICENSE).

---

Happy forecasting! 🎉

