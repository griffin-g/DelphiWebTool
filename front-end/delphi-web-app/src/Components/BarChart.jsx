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
export const ResponseBarChart = ({ labels, responses, type }) => {
  console.log("labels:", labels);
  console.log("responses:", responses);
  console.log("type:", type);
  const [data, setData] = useState([]);
  const [dataKey, setDataKey] = useState("");
  useEffect(() => {
    if (responses && responses.length > 0 && type == "checkbox") {
      setDataKey("Checked");
      const data = labels.map((label, index) => {
        return {
          name: label,
          Checked: responses.reduce(
            (count, responseArray) =>
              count +
              responseArray.filter((response) => response === label).length,
            0
          ),
        };
      });
      setData(data);
      console.log("data:", data);
    } else if (responses && responses.length > 0 && type === "ranking") {
      setDataKey("rank_scores");
      const data = labels.map((label, index) => {
        return {
          name: label,
          rank_scores: responses.reduce((count, responseArray) => {
            return (
              count +
              responseArray.reduce((score, response, index) => {
                if (response === label) {
                  return score + (responseArray.length - index);
                }
                return score;
              }, 0)
            );
          }, 0),
        };
      });
      setData(data);
      console.log("data:", data);
    }
  }, [responses, labels, type]);
  return (
    <ResponsiveContainer width="80%" height="100%" paddingRight="50px">
      <BarChart width={"auto"} height={"auto"} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={dataKey}
          fill="#9DD6C8"
          activeBar={<Rectangle fill="#A58686" stroke="black" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
