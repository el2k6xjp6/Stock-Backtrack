import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { ProfitLineChart } from "../ProfitLineChart";
import { HoldingPieChart } from "../HoldingPieChart";

type ClosePrices = {
  [ker: string]: Array<number>;
};

type Quote = {
  symbol: string;
  date: string;
  cost: number;
  amount: number;
};

type Chart = {
  dateIndex: Array<string>;
  close: ClosePrices;
  quote: Array<Quote>;
};

type ValueAndCost = {
  name: string;
  value: number;
  cost: number;
};

type ProfitLineChartData = {
  name: string;
  profit: number;
};

type PieChartData = {
  name: string;
  value: number;
};

function App() {
  const [profitLineChartData, setProfitLineChartData] = useState(
    [] as Array<ProfitLineChartData>
  );
  const [pieChartData, setPieChartData] = useState([] as Array<PieChartData>);

  const [quotes, setQuotes] = useState([] as Array<Quote>);

  useEffect(() => {
    axios.get("http://localhost:8000/api/value").then((res) => {
      const data: Chart = res.data;
      const { quote, dateIndex, close } = data;
      setQuotes(quote);
      let chartData: Array<ValueAndCost> = dateIndex.map((date) => {
        return {
          name: date,
          value: 0,
          cost: 0,
        };
      });
      quote.forEach((q: Quote) => {
        const i = dateIndex.findIndex((date: string) => date === q.date);
        for (let j = i; j < chartData.length; j++) {
          chartData[j].cost += q.cost * q.amount;
          chartData[j].value += close[q.symbol][j] * q.amount;
        }
      });
      const profitLineChartData = chartData.map(
        (data: ValueAndCost, index: number) => {
          return {
            name: data.name,
            profit: 100 * (chartData[index].value / chartData[index].cost - 1),
          };
        }
      );
      setProfitLineChartData(profitLineChartData);

      let pieData = {} as { [key: string]: number };
      for (let q of quote) {
        const closePrice = close[q.symbol].pop() as number;
        if (q.symbol in pieData) {
          pieData[q.symbol] += q.amount * closePrice;
        } else {
          pieData[q.symbol] = q.amount * closePrice;
        }
      }

      const pieChartData: Array<PieChartData> = Object.keys(pieData).map(
        (key: string) => {
          return {
            name: key,
            value: pieData[key],
          };
        }
      );
      setPieChartData([...pieChartData]);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProfitLineChart profitLineChartData={profitLineChartData} />
        <HoldingPieChart pieChartData={pieChartData} />
      </div>
      <DataTable quotes={quotes} />
    </div>
  );
}

export default App;
