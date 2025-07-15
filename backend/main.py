
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TradeRequest(BaseModel):
    strategy: str
    capital: float
    tsl: float
    paper: Optional[bool] = True

@app.post("/trade")
def execute_trade(data: TradeRequest):
    # Placeholder for real trade execution logic
    return {
        "status": "success",
        "strategy": data.strategy,
        "capital": data.capital,
        "tsl": data.tsl,
        "mode": "paper" if data.paper else "live"
    }

@app.get("/funds")
def get_funds(broker: Optional[str] = "Zerodha"):
    # Placeholder for fund fetch
    return {
        "broker": broker,
        "available_margin": 20000,
        "used_margin": 5000
    }

@app.get("/orders")
def get_orders(broker: Optional[str] = "Zerodha"):
    # Placeholder for order history
    return {
        "broker": broker,
        "orders": [
            {"symbol": "NIFTY", "type": "BUY", "qty": 1, "status": "Executed"},
            {"symbol": "BANKNIFTY", "type": "SELL", "qty": 1, "status": "Executed"}
        ]
    }
