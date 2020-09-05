import "react-calendar-heatmap/dist/styles.css";
import React, { useState } from "react";
import "./Calendar.css";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

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
      timingsByDate[date].count = timingsByDate[date].count + 1;
    } else {
      timingsByDate[date] = {
        count: 1,
        date: date,
      };
    }
  });

  return (
    <div className="calendar-container">
      <CalendarHeatmap
        values={Object.values(timingsByDate)}
        horizontal={false}
        showWeekdayLabels={true}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        tooltipDataAttrs={(value) => {
          return (
            value.date && {
              "data-tip": `${value.date} - ${value.count || 0} times`,
            }
          );
        }}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.count}`;
        }}
      />
      <ReactTooltip />
    </div>
  );
};

export default Calendar;
