import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = (props) => {
  const { timingsByDate, onClickHandler } = props;
  const [screenOrientation, setOrientation] = useState("portrait");

  function doOnOrientationChange() {
    switch (window.orientation) {
      case -90:
      case 90:
        setOrientation("landscape");
        break;
      default:
        setOrientation("portrait");
        break;
    }
  }

  window.addEventListener("orientationchange", doOnOrientationChange);

  return (
    <ResponsiveContainer
      width="100%"
      height={screenOrientation.includes("landscape") ? "75%" : "40%"}
    >
      <LineChart
        data={Object.values(timingsByDate)}
        margin={{
          top: 40,
          right: 40,
          left: 0,
          bottom: 5,
        }}
        onClick={onClickHandler}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateFriendly" angle={-45} />
        <YAxis />
        <Legend />
        <Line
          dot={{ stroke: "red", strokeWidth: 2 }}
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
