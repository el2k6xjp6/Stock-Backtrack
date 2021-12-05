import axios from "axios";
import { useEffect, useState } from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

function App() {
  type ValueAndCost = {
    name: string;
    value: number;
    cost: number;
  };
  type ProfitLineChart = {
    name: string;
    profit: number;
  };
  type RevenueLineChart = {
    name: string;
    revenue: number;
  };
  type PieChartData = {
    name: string;
    value: number;
  };
  const [profitLineChartData, setProfitLineChartData] = useState(
    [] as Array<ProfitLineChart>
  );
  const [revenueLineChartData, setRevenueLineChartData] = useState(
    [] as Array<RevenueLineChart>
  );
  const [pieChartData, setPieChartData] = useState([] as Array<PieChartData>);

  const [quotes, setQuotes] = useState([] as Array<Quote>);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/value", {
        params: {
          year: 2021,
          month: 4,
          day: 1,
        },
      })
      .then((res) => {
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
              profit:
                100 * (chartData[index].value / chartData[index].cost - 1),
            };
          }
        );
        setProfitLineChartData(profitLineChartData);
        // const revenueLineChartData = chartData.map(
        //   (data: ValueAndCost, index: number) => {
        //     return {
        //       name: data.name,
        //       revenue: chartData[index].value - chartData[index].cost,
        //     };
        //   }
        // );
        // setRevenueLineChartData(revenueLineChartData);
        // let pieData = {} as { [key: string]: number };
        // for (let q of quote) {
        //   const closePrice = close[q.symbol].pop() as number;
        //   if (q.symbol in pieData) {
        //     pieData[q.symbol] += q.amount * closePrice;
        //   } else {
        //     pieData[q.symbol] = q.amount * closePrice;
        //   }
        // }
        // const pieChartData: Array<PieChartData> = Object.keys(pieData).map(
        //   (key: string) => {
        //     return {
        //       name: key,
        //       value: pieData[key],
        //     };
        //   }
        // );
        // setPieChartData([...pieChartData]);
      });
  }, []);

  const colors = ["#83a6ed", "#82ca9d"];

  return (
    <div>
      <AreaChart
        width={1440}
        height={720}
        data={profitLineChartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#FFB7DD"
          fill="#FFB7DD"
        />
      </AreaChart>

      {/* <AreaChart
        width={1440}
        height={720}
        data={revenueLineChartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="revenue" stroke="#8884d8" />
      </AreaChart> */}
      {/* <PieChart width={400} height={400}>
        <Pie data={pieChartData} dataKey="value" nameKey="name" isAnimationActive={true}>
          {pieChartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 2]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart> */}
      <table>
        <tbody>
          {quotes.map((quote: Quote) => {
            return (
              <tr style={{ display: "flex", justifyContent: "space-around" }}>
                <td>{quote.symbol}</td>
                <td>{quote.cost}</td>
                <td>{quote.amount}</td>
                <td>{quote.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
