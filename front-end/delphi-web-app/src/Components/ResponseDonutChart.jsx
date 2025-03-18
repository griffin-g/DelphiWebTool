import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const ResponseDonutChart = ({ responses = [], labels = [] }) => {
  const transformData = (responses, labels) => {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return [];
    }

    const counts = labels.reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    responses.forEach((response) => {
      if (Array.isArray(response)) {
        response.forEach((choice) => {
          if (counts[choice] !== undefined) {
            counts[choice]++;
          }
        });
      }
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = transformData(responses, labels);

  return (
    <ResponsiveContainer width="100%" minHeight={300} height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} selections`, "Count"]} />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
