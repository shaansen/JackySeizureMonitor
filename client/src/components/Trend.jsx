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
import * as actions from "../actions";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { getCount } from "./util.js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: moment(new Date()).tz(moment.tz.guess()).format("YYYY"),
      currentDateObject: null,
    };
  }

  componentDidMount() {
    this.props.getEvents();
  }
  render() {
    const { currentYear, currentDateObject } = this.state;
    const { timingsByDate, yearsAvailable } = getCount(
      this.props.events,
      currentYear
    );

    const occurrence =
      currentDateObject &&
      `${currentDateObject.count} ${
        currentDateObject.count === 1 ? "time" : "times"
      }`;

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

    const details = currentDateObject !== null && (
      <div className='trend-detail-container'>
        <Card variant='outlined'>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Jacky had epilepsy on
            </Typography>
            <Typography variant='h5' component='h2'>
              {currentDateObject.dateFriendly}
              <Chip label={occurrence} />
            </Typography>
            <List dense={true} aria-label='main mailbox folders'>
              {currentDateObject.time.map((a, i) => (
                <ListItem key={i} button>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText secondary={a} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );

    return (
      <div className='trend-container'>
        {buttons}
        <ResponsiveContainer width='100%' height='40%'>
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
            onClick={(e) => {
              this.setState({
                currentDateObject: e && e.activePayload[0].payload,
              });
            }}
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
        {details}
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return { events };
};

export default connect(
  mapStateToProps,
  actions
)(
  React.memo(Example, (prevProps, newProps) => {
    return prevProps?.events?.length === newProps?.events?.length;
  })
);
