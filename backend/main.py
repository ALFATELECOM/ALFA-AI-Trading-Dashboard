
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from strategies.ai_selector import choose_strategy
from zerodha.broker import place_order
from pydantic import BaseModel

app = FastAPI()

# Allow frontend
origins = [
    "https://alfa-ai-trading-dashboard.vercel.app",
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory config
config = {
    "capital_limit": 500,
    "tsl_percent": 1.5
}

class SettingsInput(BaseModel):
    capital_limit: float
    tsl_percent: float

@app.get("/analyze")
def analyze():
    strategy = choose_strategy()
    return {"strategy": strategy}

@app.post("/settings")
def update_settings(input: SettingsInput):
    config["capital_limit"] = input.capital_limit
    config["tsl_percent"] = input.tsl_percent
    return {"status": "Settings updated", "config": config}

@app.post("/trade")
def execute_trade():
    strategy = choose_strategy()
    result = place_order(strategy, config["capital_limit"])
    return {
        "status": "Order Placed",
        "strategy": strategy,
        "capital_used": config["capital_limit"],
        "response": result
    }
