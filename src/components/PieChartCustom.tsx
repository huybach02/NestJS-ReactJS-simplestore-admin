import {PieChart, Pie, ResponsiveContainer, Tooltip} from "recharts";

interface PieChartCustomProps {
  data: {
    _id: number;
    count: number;
  }[];
}

const PieChartCustom = ({data}: PieChartCustomProps) => {
  const dataPie = data.map((item) => ({
    name: `${item._id} Star`,
    value: item.count,
  }));

  return (
    <div style={{width: "100%", height: "500px"}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={1000} height={1000}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={dataPie}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCustom;
