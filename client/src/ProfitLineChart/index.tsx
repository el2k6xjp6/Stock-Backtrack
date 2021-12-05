import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
} from "recharts";

type ProfitLineChartType = {
  name: string;
  profit: number;
};

type Props = {
  profitLineChartData: Array<ProfitLineChartType>;
};

export const ProfitLineChart = (props: Props) => {
  return (
    <AreaChart
      width={1000}
      height={600}
      data={props.profitLineChartData}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="profit" stroke="#FFB7DD" fill="#FFB7DD" />
    </AreaChart>
  );
};
