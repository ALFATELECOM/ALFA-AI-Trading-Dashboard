This backend supports:
- Paper trading toggle (via POST /trade with `"paper": true`)
- Zerodha balance check: GET /funds
- Zerodha order history: GET /orders

Replace `your_access_token_here` in main.py with your actual Zerodha access token.