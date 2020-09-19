import "react-calendar-heatmap/dist/styles.css";
import React from "react";
import "./Calendar.css";
import CalendarHeatmap from "react-calendar-heatmap";
import moment from "moment-timezone";
import * as actions from "../actions";
import { connect } from "react-redux";
import { getCount } from "./util.js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: moment(new Date()).tz(moment.tz.guess()).format("YYYY"),
      currentTooltip: null,
    };
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { currentYear, currentTooltip } = this.state;
    const { timingsByDate, yearsAvailable } = getCount(
      this.props.events,
      currentYear
    );

    const renderTooltipInfo = () => {
      if (currentTooltip) {
        const day = moment(currentTooltip.date)
          .tz(moment.tz.guess())
          .format("DD");
        const month = moment(currentTooltip.date)
          .tz(moment.tz.guess())
          .format("MMM");
        const times = currentTooltip.count;
        return (
          <div className='tooltip-info-container'>
            <h1>{day}</h1>
            <h3>{month}</h3>
            <p>
              {times} {times === 1 ? "time" : "times"}
            </p>
          </div>
        );
      }
      return null;
    };

    const buttons = (
      <div id='calendar-year-buttons'>
        <ButtonGroup
          orientation='vertical'
          variant='contained'
          aria-label='contained primary button group'
        >
          {yearsAvailable.map((year, id) => (
            <Button
              key={id}
              color={year === currentYear ? "secondary" : "default"}
              onClick={(e) =>
                this.setState({
                  currentYear: e.target.textContent,
                  currentTooltip: null,
                })
              }
            >
              {year}
            </Button>
          ))}
        </ButtonGroup>
        {renderTooltipInfo()}
      </div>
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
            onClick={(value) => this.setState({ currentTooltip: value })}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-scale-${value.count}`;
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return { events };
};

export default connect(mapStateToProps, actions)(Calendar);
