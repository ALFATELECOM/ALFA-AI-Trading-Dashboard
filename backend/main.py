from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TradeRequest(BaseModel):
    strategy: str
    capital: int
    tsl: float

@app.get("/")
def read_root():
    return {"status": "OK", "message": "ALFA AI Backend is running."}

@app.get("/strategy")
def get_strategy():
    return {"strategy": "Breakout Strategy"}

@app.post("/trade")
def execute_trade(data: TradeRequest):
    return {
        "status": "Order Placed",
        "strategy": data.strategy,
        "capital_used": data.capital,
        "response": {
            "order_id": "MOCK12345",
            "symbol": "BANKNIFTY",
            "action": "BUY",
            "quantity": 5,
            "price": 100
        }
    }