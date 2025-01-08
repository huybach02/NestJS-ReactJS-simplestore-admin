import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartCustomProps {
  data: {
    month: string;
    totalRevenue: number;
    totalOrder: number;
    profit: number;
  }[];
}

const ChartCustom = ({data}: ChartCustomProps) => {
  const dataChart = data.map((item) => ({
    name: item.month,
    TotalRevenue: item.totalRevenue,
    TotalOrder: item.totalOrder,
    Profit: item.profit,
  }));

  return (
    <div style={{width: "100%", height: 500, marginTop: 10}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="TotalRevenue"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="TotalOrder"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            dataKey="Profit"
            fill="#ffc658"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCustom;
