import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment-timezone";
import useScreenOrientation from "react-hook-screen-orientation";

const Chart = (props) => {
  const { timingsByDate, onClickHandler } = props;
  const screenOrientation = useScreenOrientation();
  return (
    <ResponsiveContainer
      width='100%'
      height={screenOrientation.includes("landscape") ? "75%" : "40%"}
    >
      <LineChart
        data={Object.values(timingsByDate).sort((a, b) => {
          const a1 = moment(a.date, "YYYY-MM-DD");
          const b1 = moment(b.date, "YYYY-MM-DD");
          return a1.isSameOrAfter(b1) ? 1 : -1;
        })}
        margin={{
          top: 40,
          right: 40,
          left: 0,
          bottom: 5,
        }}
        onClick={onClickHandler}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='dateFriendly' angle={-45} />
        <YAxis />
        <Legend />
        <Line
          dot={{ stroke: "red", strokeWidth: 2 }}
          type='monotone'
          dataKey='count'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
