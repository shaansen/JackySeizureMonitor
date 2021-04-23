import React, { useState } from "react";
import "react-calendar-heatmap/dist/styles.css";
const CalendarHeatmap = React.lazy(() => import("react-calendar-heatmap"));

const Heatmap = (props) => {
  const { currentYear, timingsByDate, onClickHandler } = props;
  const [screenOrientation, setOrientation] = useState(window.innerWidth < 768 ? "portrait" : "landscape");

  window.addEventListener('resize', (data) => {
    if (data.target.innerWidth < 768) {
      setOrientation("portrait");
    } else {
      setOrientation("landscape");
    }
  });

  return (
    <div
      className={`react-calendar-heatmap-${screenOrientation.includes("landscape") ? "landscape" : "portrait"
        }`}
    >
      <CalendarHeatmap
        startDate={new Date(`${currentYear}-01-01`)}
        endDate={new Date(`${currentYear}-12-31`)}
        values={Object.values(timingsByDate)}
        horizontal={screenOrientation.includes("landscape")}
        showWeekdayLabels={true}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        onClick={onClickHandler}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
};

export default Heatmap;
