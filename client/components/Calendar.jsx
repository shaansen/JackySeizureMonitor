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
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

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
  const [currentYear, setYear] = useState(moment(new Date()).format("YYYY"));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const years = _.sortedUniq(
    _.map(data.events, (d) => moment(d.date).format("YYYY"))
  );
  const timingsByDate = {};

  _.forEach(data.events, (d) => {
    if (moment(d.date).format("YYYY") === currentYear) {
      const date = moment(d.date).format("YYYY-MM-DD");

      if (timingsByDate[date] !== undefined) {
        timingsByDate[date].count = timingsByDate[date].count + 1;
      } else {
        timingsByDate[date] = {
          count: 1,
          date: date,
        };
      }
    }
  });

  const timeline = (
    <Timeline>
      {years.map((year) => (
        <TimelineItem key={year} onClick={() => setYear(year)}>
          <TimelineSeparator>
            <TimelineDot color={year === currentYear ? "primary" : "grey"} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{year}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );

  return (
    <div className="calendar-container">
      {timeline}
      <CalendarHeatmap
        startDate={new Date(`${currentYear}-01-01`)}
        endDate={new Date(`${currentYear}-12-01`)}
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
