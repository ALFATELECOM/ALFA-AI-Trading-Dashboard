from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from kiteconnect import KiteConnect
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("Z_API_KEY")
api_secret = os.getenv("Z_API_SECRET")
access_token = os.getenv("Z_ACCESS_TOKEN")

kite = KiteConnect(api_key=api_key)
kite.set_access_token(access_token)

class TradeRequest(BaseModel):
    strategy: str
    capital: int
    tsl: float
    paper: bool = True

@app.get("/")
def read_root():
    return {"status": "OK", "message": "Backend is live with .env token config."}

@app.get("/funds")
def get_funds():
    try:
        return {"status": "success", "funds": kite.margins()}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/orders")
def get_orders():
    try:
        return {"status": "success", "orders": kite.orders()}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/trade")
def place_trade(data: TradeRequest):
    if data.paper:
        return {"status": "paper", "message": "Simulated trade", "capital": data.capital, "tsl": data.tsl}
    try:
        order_id = kite.place_order(
            variety=kite.VARIETY_REGULAR,
            exchange=kite.EXCHANGE_NSE,
            tradingsymbol="BANKNIFTY",
            transaction_type=kite.TRANSACTION_TYPE_BUY,
            quantity=1,
            product=kite.PRODUCT_MIS,
            order_type=kite.ORDER_TYPE_MARKET
        )
        return {"status": "live", "order_id": order_id}
    except Exception as e:
        return {"status": "error", "message": str(e)}