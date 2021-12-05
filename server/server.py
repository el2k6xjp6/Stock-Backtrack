from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
from datetime import date

app = Flask(__name__)
cors = CORS(app, resources=r'/api/*', origins="*")
global holdings
holdings = sorted(
    [["U", "2021/11/05", 149.99, 1.0], ["NET", "2021/11/05", 200.0, 1.0],
     ["COUR", "2021/11/04", 33.0, 1.0], ["APPS", "2021/11/04", 77.0, 1.0],
     ["ZM", "2021/11/04", 275.0, 1.0], ["SNAP", "2021/11/03", 51.99, 1.0],
     ["AAPL", "2021/10/01", 139.99, 3.0], ["AAPL", "2021/10/20", 148.99, 5.0],
     ["ABNB", "2021/08/20", 142.0, 1.0], ["AMPL", "2021/10/04", 53.0, 1.0],
     ["AMZN", "2021/10/22", 3335.0, 1.0], ["ASAN", "2021/10/27", 124.5, 1.0],
     ["ASML", "2021/10/19", 787.0, 1.0], ["DASH", "2021/09/23", 214.5, 1.0],
     ["DASH", "2021/10/05", 199.0, 1.0], ["DIDI", "2021/07/06", 12.1, 5.0],
     ["DIS", "2021/04/20", 184.0, 4.0], ["DIS", "2021/04/20", 182.5, 4.0],
     ["DIS", "2021/04/20", 182.0, 2.0], ["DIS", "2021/09/22", 172.99, 1.0],
     ["DIS", "2021/10/19", 170.0, 1.0], ["DIS", "2021/11/11", 159.99, 1.0],
     ["FB", "2021/07/06", 354.4, 1.0], ["FB", "2021/07/06", 351.0, 1.0],
     ["FB", "2021/07/14", 351.0, 1.0], ["FB", "2021/09/22", 345.0, 1.0],
     ["FB", "2021/09/23", 348.99, 1.0], ["FB", "2021/09/28", 339.99, 1.0],
     ["FB", "2021/10/04", 329.99, 1.0], ["FB", "2021/10/05", 324.0, 1.0],
     ["GOOGL", "2021/07/06", 2510.0, 1.0],
     ["GOOGL", "2021/10/22", 2750.0, 1.0], ["GTLB", "2021/10/15", 95.0, 1.0],
     ["GTLB", "2021/10/27", 110.0, 1.0], ["MSFT", "2021/09/08", 298.0, 1.0],
     ["MSFT", "2021/09/13", 295.0, 1.0], ["MSFT", "2021/09/28", 284.99, 1.0],
     ["MSFT", "2021/09/30", 284.0, 1.0], ["NFLX", "2021/04/23", 501.5, 2.0],
     ["NFLX", "2021/04/23", 501.0, 1.0], ["NVDA", "2021/09/08", 220.0, 1.0],
     ["NVDA", "2021/09/13", 219.0, 1.0], ["NVDA", "2021/09/17", 219.0, 1.0],
     ["NVDA", "2021/09/20", 209.0, 1.0], ["NVDA", "2021/09/28", 207.99, 1.0],
     ["NVDA", "2021/09/29", 204.99, 1.0], ["NVDA", "2021/10/04", 199.0, 1.0],
     ["PLTR", "2021/07/19", 20.65, 1.0], ["PLTR", "2021/11/12", 22.4, 2.0],
     ["PYPL", "2021/10/21", 259.0, 1.0], ["PYPL", "2021/10/22", 244.99, 1.0],
     ["SE", "2021/09/08", 343.5, 1.0], ["SE", "2021/11/09", 350.0, 1.0],
     ["SPOT", "2021/04/20", 275.0, 4.0], ["SPOT", "2021/09/08", 250.0, 1.0],
     ["SPOT", "2021/04/20", 273.0, 2.0], ["SPOT", "2021/04/20", 271.5, 2.0],
     ["SQ", "2021/09/08", 260.0, 1.0], ["SQ", "2021/09/08", 255.0, 1.0],
     ["SQ", "2021/09/10", 249.0, 1.0], ["SQ", "2021/09/13", 244.0, 1.0],
     ["SQ", "2021/09/13", 239.0, 1.0], ["SQ", "2021/10/04", 228.0, 1.0],
     ["SQ", "2021/10/04", 225.0, 1.0], ["SQ", "2021/10/14", 248.99, 1.0],
     ["SQ", "2021/11/03", 249.99, 1.0], ["TSLA", "2021/04/28", 695.0, 1.0],
     ["TWLO", "2021/11/01", 290.0, 1.0], ["UPST", "2021/10/27", 315.0, 1.0],
     ["UPST", "2021/11/11", 250.0, 1.0], ["WMT", "2021/10/13", 138.6, 1.0]],
    key=lambda x: x[1])


@app.route('/api/value')
def get_holdings():
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    day = request.args.get('day', type=int)
    startDate = date(year, month, day)
    start = 0
    for index, h in enumerate(holdings):
        [y, m, d] = h[1].split("/")
        da = date(int(y), int(m), int(d))
        if startDate <= da:
            start = index
            break
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
        "date": holding[1],
        "cost": holding[2],
        "amount": holding[3]
    } for holding in holdings[start:]]

    return jsonify({"dateIndex": dateIndex, "close": close, "quote": quote})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
