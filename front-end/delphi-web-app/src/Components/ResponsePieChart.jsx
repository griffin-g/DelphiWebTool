import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
//reference: https://recharts.org/en-US/examples/CustomActiveShapePieChart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`Value ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const ResponsePieChart = ({ responses = [], labels = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const transformRankingData = (responses, labels) => {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return [];
    }

    const counts = {};
    labels.forEach((label) => {
      counts[label] = 0;
    });

    // Count first choice occurrences
    responses.forEach((response) => {
      if (Array.isArray(response) && response.length > 0) {
        const firstChoice = response[0];
        if (firstChoice && labels.includes(firstChoice)) {
          counts[firstChoice] = (counts[firstChoice] || 0) + 1;
        }
      }
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const data = transformRankingData(responses, labels);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Don't render if no data
  if (data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      minHeight={280}
      minWidth={280}
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
