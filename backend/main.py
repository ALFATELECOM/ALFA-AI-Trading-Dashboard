
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class TradeRequest(BaseModel):
    strategy: str
    capital: float
    tsl: float
    paper: bool

@app.post("/trade")
def trade(req: TradeRequest):
    return {"status": "success", "message": "Trade Executed", "capital": req.capital, "tsl": req.tsl, "paper": req.paper}

@app.get("/funds")
def funds(broker: str = "Zerodha"):
    return {"broker": broker, "balance": 99999.99}

@app.get("/orders")
def orders(broker: str = "Zerodha"):
    return {"broker": broker, "orders": [{"symbol": "BANKNIFTY", "status": "COMPLETE"}]}
