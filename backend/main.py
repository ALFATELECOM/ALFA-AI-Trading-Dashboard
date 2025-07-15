from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from kiteconnect import KiteConnect

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

kite = KiteConnect(api_key="1rihyd0xb6gkomut")
kite.set_access_token("your_access_token_here")  # ← Replace this

@app.get("/")
def read_root():
    return {"status": "OK", "message": "ALFA AI Backend is running."}

@app.get("/strategy")
def get_strategy():
    return {"strategy": "Breakout Strategy"}

@app.post("/trade")
def execute_trade(data: TradeRequest):
    try:
        quantity = int(data.capital / 100)  # capital ÷ price approx
        order_id = kite.place_order(
            variety=kite.VARIETY_REGULAR,
            exchange=kite.EXCHANGE_NSE,
            tradingsymbol="BANKNIFTY24JUL56000CE",  # update based on scanner
            transaction_type=kite.TRANSACTION_TYPE_BUY,
            quantity=quantity,
            product=kite.PRODUCT_MIS,
            order_type=kite.ORDER_TYPE_MARKET
        )
        return {
            "status": "Order Placed",
            "strategy": data.strategy,
            "capital_used": data.capital,
            "response": {
                "order_id": order_id,
                "symbol": "BANKNIFTY",
                "quantity": quantity
            }
        }
    except Exception as e:
        return {"status": "Error placing order", "error": str(e)}
