import "react-calendar-heatmap/dist/styles.css";
import React from "react";
import "./Calendar.css";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import _ from "lodash";
import * as actions from "../actions";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: moment(new Date()).format("YYYY"),
    };
  }

  componentDidMount() {
    ReactTooltip.rebuild();
    this.props.getEvents();
  }

  render() {
    const { currentYear } = this.state;
    const data = {
      events: this.props.events,
    };

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

    let yearsAvailable =
      (this.props.events &&
        this.props.events.map((a) => moment(a.date).format("YYYY"))) ||
      [];

    yearsAvailable = _.sortedUniq(yearsAvailable);

    const buttons = (
      <ButtonGroup
        id='calendar-year-buttons'
        orientation='vertical'
        variant='contained'
        color='primary'
        aria-label='contained primary button group'
      >
        {yearsAvailable.map((year, id) => (
          <Button
            key={id}
            onClick={(e) =>
              this.setState({ currentYear: e.target.textContent })
            }
          >
            {year}
          </Button>
        ))}
      </ButtonGroup>
    );

    return (
      <div className='calendar-container'>
        {buttons}
        <div className={`react-calendar-heatmap`}>
          <CalendarHeatmap
            startDate={new Date(`${currentYear}-01-01`)}
            endDate={new Date(`${currentYear}-12-01`)}
            values={Object.values(timingsByDate)}
            horizontal={false}
            showWeekdayLabels={true}
            weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            tooltipDataAttrs={(value) => {
              if (value.date !== null) {
                return {
                  "data-tip": `${moment(value.date).format("MMM Do")} - ${
                    value.count || 0
                  } ${value.count === 1 ? "time" : "times"}`,
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
  }
}

const mapStateToProps = ({ events }) => {
  return { events };
};

export default connect(mapStateToProps, actions)(Calendar);
