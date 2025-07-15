
from fastapi import FastAPI
from strategies.ai_selector import choose_strategy
from brokers.zerodha import place_order
from risk.stoploss import check_stoploss

app = FastAPI()

@app.get("/analyze")
def analyze():
    strategy = choose_strategy()
    return {"strategy": strategy}

@app.post("/trade")
def trade():
    strategy = choose_strategy()
    response = place_order(strategy)
    return {"trade_executed": response}

@app.post("/check_sl")
def stoploss_check():
    return check_stoploss()
