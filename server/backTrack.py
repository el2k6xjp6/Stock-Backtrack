import yfinance as yf
# import plotly.express as px
# import pandas as pd


# def transform(history):
#     close = history["Close"]
#     base = close[0]
#     for index in close.index:
#         close.loc[index] = close[index] / base
#     return close


# ticker_list = ["VOO", "^IXIC", "GOOGL", "NFLX", "SPOT", "TSLA"]
# data = pd.DataFrame([])

# sp500 = yf.Ticker("VOO").history(start="2021-04-21")
# data = pd.concat([data, transform(sp500)], axis=1)

# TSLA = yf.Ticker("TSLA").history(start="2021-04-29")
# data = pd.concat([data, transform(TSLA)], axis=1)

# GOOGL = yf.Ticker("GOOGL").history(start="2021-07-07")
# print(type(GOOGL["Close"]))
# print(GOOGL["Close"].index)
# data = pd.concat([data, transform(GOOGL)], axis=1)

# DIS = yf.Ticker("DIS").history(start="2021-04-21")
# data = pd.concat([data, transform(DIS)], axis=1)

# NFLX = yf.Ticker("NFLX").history(start="2021-04-24")
# data = pd.concat([data, transform(NFLX)], axis=1)

# data.columns = ["VOO", "TSLA", "GOOGL", "DIS", "NFLX"]
# print(data)
# f = px.line(data)
# f.show()


[y, m, d] = "2020/01/01".split("/")
print(y, m, d)
