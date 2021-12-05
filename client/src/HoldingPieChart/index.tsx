import { Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

type PieChartData = {
  name: string;
  value: number;
};

type Props = {
  pieChartData: Array<PieChartData>;
};

const colors = ["#83a6ed", "#82ca9d"];

export const HoldingPieChart = (props: Props) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={props.pieChartData}
        dataKey="value"
        nameKey="name"
        isAnimationActive={true}
      >
        {props.pieChartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 2]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
