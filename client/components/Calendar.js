import "react-calendar-heatmap/dist/styles.css";
import React, { useState } from "react";
import "./Calendar.css";
import CalendarHeatmap from "react-calendar-heatmap";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import moment from "moment";
import _ from "lodash";

export const GET_EVENTS = gql`
  {
    events {
      id
      date
    }
  }
`;

const Calendar = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const timingsByDate = {};

  _.forEach(data.events, (d) => {
    const date = moment(d.date).format("YYYY-MM-DD");

    if (timingsByDate[date] !== undefined) {
      timingsByDate[date].total = timingsByDate[date].total + 1;
    } else {
      timingsByDate[date] = {
        total: 1,
        date: date,
      };
    }
  });

  const startDate = new Date("2020-05-01");
  console.log(startDate);

  return (
    <CalendarHeatmap
      values={Object.values(timingsByDate)}
      showWeekdayLabels={true}
      weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
      classForValue={(value) => {
        if (!value) {
          return "color-empty";
        }
        return `color-scale-${value.count}`;
      }}
    />
  );
};

export default Calendar;
