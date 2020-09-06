import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import moment from "moment";
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
import ButtonGroup from "@material-ui/core/ButtonGroup";

export const GET_EVENTS = gql`
  {
    events {
      id
      date
    }
  }
`;

const EventList = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [sortDirection, setSortDirection] = useState("desc");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const timingsByDate = {};

  _.forEach(data.events, (d) => {
    const date = moment(d.date).format("MMMM Do YYYY");

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
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortedData = _.uniq(
    data.events.map((a) => a.date),
    (a) => moment(a).format("YYYY-MM-DD")
  );
  sortedData.sort((a, b) => {
    return sortDirection === "asc" ? 1 : -1;
  });

  return (
    <TableContainer component={Paper}>
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
            const date = moment(event);
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{date.format("MMMM Do YYYY")}</TableCell>
                <TableCell>{date.format("ddd")}</TableCell>
                <TableCell className="event-button-cell">
                  {timingsByDate[date.format("MMMM Do YYYY")].event.map(
                    (e, i) => {
                      return <DeleteEvent key={i} event={e}></DeleteEvent>;
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
};

export default EventList;
