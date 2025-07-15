from fastapi import FastAPI
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
    paper_mode: bool

@app.get("/")
def read_root():
    return {"status": "OK", "message": "Backend is running"}

@app.post("/trade")
def trade(data: TradeRequest):
    if data.paper_mode:
        return {
            "status": "Order Placed (PAPER MODE)",
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
    else:
        return {"status": "LIVE MODE", "message": "Place real trade here"}
