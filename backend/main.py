from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from kiteconnect import KiteConnect
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your Zerodha API key and secret
kite = KiteConnect(api_key="1rihyd0xb6gkomut")
kite.set_access_token("your_access_token_here")  # Replace with your access token

class TradeRequest(BaseModel):
    strategy: str
    capital: int
    tsl: float
    paper: bool = True  # Optional toggle for paper/live mode

@app.get("/")
def read_root():
    return {"status": "OK", "message": "ALFA AI Backend is running."}

@app.get("/strategy")
def get_strategy():
    return {"strategy": "Breakout Strategy"}

@app.post("/trade")
def execute_trade(data: TradeRequest):
    if data.paper:
        return {
            "status": "Order Placed (PAPER MODE)",
            "strategy": data.strategy,
            "capital_used": data.capital,
            "response": {
                "order_id": "MOCK12345",
                "symbol": "BANKNIFTY",
                "action": "BUY",
                "quantity": 5,
                "price": 100,
            }
        }
    else:
        try:
            order_id = kite.place_order(
                variety=kite.VARIETY_REGULAR,
                exchange=kite.EXCHANGE_NSE,
                tradingsymbol="BANKNIFTY",
                transaction_type=kite.TRANSACTION_TYPE_BUY,
                quantity=5,
                product=kite.PRODUCT_MIS,
                order_type=kite.ORDER_TYPE_MARKET
            )
            return {"status": "LIVE ORDER PLACED", "order_id": order_id}
        except Exception as e:
            return {"status": "Error placing live order", "error": str(e)}

@app.get("/funds")
def check_funds():
    try:
        funds = kite.margins()
        return {"status": "success", "funds": funds}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/orders")
def check_orders():
    try:
        orders = kite.orders()
        return {"status": "success", "orders": orders}
    except Exception as e:
        return {"status": "error", "message": str(e)}