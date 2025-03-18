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
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy - outerRadius - 10}
        dy={8}
        textAnchor="middle"
        fill="#333"
        fontSize="14px"
      >
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
        innerRadius={outerRadius + 3}
        outerRadius={outerRadius + 6}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize="12px"
      >
        {`${value} selections`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        dy={14}
        textAnchor={textAnchor}
        fill="#999"
        fontSize="11px"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
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
      height="100%"
      minHeight={300}
      minWidth={300}
    >
      <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
