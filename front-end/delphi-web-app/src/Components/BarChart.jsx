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
import { useEffect, useState } from "react";
export const ResponseBarChart = ({ labels, responses }) => {
  console.log("labels:", labels);
  console.log("responses:", responses);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (responses && responses.length > 0) {
      const data = labels.map((label, index) => {
        return {
          name: label,
          checked: responses.reduce(
            (count, responseArray) =>
              count +
              responseArray.filter((response) => response === label).length,
            0
          ),
        };
      });
      setData(data);
      console.log("data:", data);
    }
  }, [responses, labels]);
  return (
    <ResponsiveContainer width="100%" height="100%" paddingRight="50px">
      <BarChart width={"auto"} height={"auto"} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="checked"
          fill="#9DD6C8"
          activeBar={<Rectangle fill="#A58686" stroke="black" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
