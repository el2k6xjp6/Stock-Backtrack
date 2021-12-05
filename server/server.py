global holdings
from datetime import date
import yfinance as yf
from flask_cors import CORS
from flask import Flask, jsonify, request
from quotes import holdings
app = Flask(__name__)
cors = CORS(app, resources=r'/api/*', origins="*")


@app.route('/api/value')
def get_holdings():
    start = 0
    y, m, d = holdings[start][3][:4], holdings[start][3][4:6], holdings[start][3][6:]
    year, month, day = int(y), int(m), int(d)
    symbols = set(s[0] for s in holdings[start:])
    symbols.add("VOO")
    dateIndex = []
    close = {}
    for symbol in symbols:
        ticker = yf.Ticker(symbol).history(
            start="{}-{}-{}".format(year, month, day))["Close"]
        if len(dateIndex) == 0:
            dateIndex = [t.strftime("%Y/%m/%d") for t in ticker.index.tolist()]
        prices = ticker.tolist()
        if len(prices) < len(dateIndex):
            close[symbol] = [0] * (len(dateIndex) - len(prices)) + prices
        else:
            close[symbol] = prices
    quote = [{
        "symbol": holding[0],
        "date": holding[3][:4] + '/' + holding[3][4:6] + '/' + holding[3][6:],
        "cost": holding[4],
        "amount": holding[5]
    } for holding in holdings[start:]]
    return jsonify({"dateIndex": dateIndex, "close": close, "quote": quote})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
