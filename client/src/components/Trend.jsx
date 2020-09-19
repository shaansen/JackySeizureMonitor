import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as actions from "../actions";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { getCount } from "./util.js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: moment(new Date()).tz(moment.tz.guess()).format("YYYY"),
    };
  }

  componentDidMount() {
    this.props.getEvents();
  }
  render() {
    const { currentYear } = this.state;
    const { timingsByDate, yearsAvailable } = getCount(
      this.props.events,
      currentYear
    );

    const buttons = (
      <ButtonGroup
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
              })
            }
          >
            {year}
          </Button>
        ))}
      </ButtonGroup>
    );

    return (
      <div className='trend-container'>
        {buttons}
        <ResponsiveContainer width='100%' height='40%'>
          <LineChart
            data={Object.values(timingsByDate)}
            margin={{
              top: 40,
              right: 40,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='dateFriendly' angle={-45} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='count'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return { events };
};

export default connect(mapStateToProps, actions)(Example);
