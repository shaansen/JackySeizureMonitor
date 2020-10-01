import React from "react";
import "./Calendar.css";

import moment from "moment-timezone";
import * as actions from "../actions";
import { connect } from "react-redux";
import { getCount } from "./util.js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Heatmap from "./Heatmap";

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

        <Heatmap
          currentYear={currentYear}
          timingsByDate={timingsByDate}
          onClickHandler={(value) => this.setState({ currentTooltip: value })}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return { events };
};

export default connect(mapStateToProps, actions)(Calendar);
