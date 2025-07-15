
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strategies.ai_selector import choose_strategy

app = FastAPI()

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

@app.get("/analyze")
def analyze():
    strategy = choose_strategy()
    return {"strategy": strategy}
