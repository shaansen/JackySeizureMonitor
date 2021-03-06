import React from "react";
import moment from "moment-timezone";
import _ from "lodash";
import DeleteEvent from "./DeleteEvent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import * as actions from "../actions";
import { connect } from "react-redux";

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: "desc",
    };
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { sortDirection } = this.state;
    let data = this.props.events || [];
    const timingsByDate = {};

    _.forEach(data, (d) => {
      const date = moment(d.date).tz(moment.tz.guess()).format("MMMM Do YYYY");

      if (timingsByDate[date] !== undefined) {
        timingsByDate[date].count = timingsByDate[date].count + 1;
        timingsByDate[date].event = [...timingsByDate[date].event, d];
      } else {
        timingsByDate[date] = {
          count: 1,
          event: [d],
        };
      }
    });

    const handleSortChange = () => {
      const { sortDirection } = this.state;
      this.setState({
        sortDirection: sortDirection === "asc" ? "desc" : "asc",
      });
    };

    const x = data.map((a) =>
      moment(a.date).tz(moment.tz.guess()).format("YYYYMMDD")
    );
    let sortedData = x.filter((v, i, a) => a.indexOf(v) === i);
    sortedData = sortDirection === "asc" ? sortedData : sortedData.reverse();

    return (
      <TableContainer className="event-list-container" component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>

              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection}
                  onClick={handleSortChange}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Times</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((event, index) => {
              const date = moment(event).tz(moment.tz.guess());
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{date.format("MMMM Do YYYY")}</TableCell>
                  <TableCell>{date.format("ddd")}</TableCell>
                  <TableCell className="event-button-cell">
                    {timingsByDate[date.format("MMMM Do YYYY")].event.map(
                      (e, i) => {
                        return (
                          <DeleteEvent
                            key={i}
                            event={e}
                          ></DeleteEvent>
                        );
                      }
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return { events };
};

export default connect(mapStateToProps, actions)(EventList);
