import "react-calendar-heatmap/dist/styles.css";
import React, { useState, useEffect } from "react";
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
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import LaptopIcon from "@material-ui/icons/Laptop";
import TvIcon from "@material-ui/icons/Tv";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import StayCurrentLandscapeIcon from "@material-ui/icons/StayCurrentLandscape";

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
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    ReactTooltip.rebuild();
  });

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

  const toggle = (
    <div className="toggle-container">
      <ToggleButtonGroup
        orientation="vertical"
        value={"somtheing"}
        onChange={() => null}
        aria-label="device"
      >
        <ToggleButton
          value="tv"
          aria-label="tv"
          onClick={() => setOrientation("landscape")}
        >
          <StayCurrentLandscapeIcon />
        </ToggleButton>
        <ToggleButton
          value="phone"
          aria-label="phone"
          onClick={() => setOrientation("portrait")}
        >
          <PhoneAndroidIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );

  const timeline = (
    <div className="timeline-container">
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
    </div>
  );
  return (
    <div className="calendar-container">
      {timeline}
      <div className={`react-calendar-heatmap-${orientation}`}>
        <CalendarHeatmap
          startDate={new Date(`${currentYear}-01-01`)}
          endDate={new Date(`${currentYear}-12-01`)}
          values={Object.values(timingsByDate)}
          horizontal={orientation === "landscape"}
          showWeekdayLabels={true}
          weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          tooltipDataAttrs={(value) => {
            if (value.date !== null) {
              return {
                "data-tip": `${moment(value.date).format("MMM Do")} - ${
                  value.count || 0
                } ${value.count == 1 ? "time" : "times"}`,
                "data-iscapture": true,
              };
            }
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
    </div>
  );
};

export default Calendar;
