import React, { useEffect } from "react";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredDates = _.uniqBy(data.events, (d) => {
    const date = moment(d.date);
    return date.format("MMMM Do YYYY");
  });

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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Recurrence</TableCell>
            <TableCell>Times</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDates.map((event, index) => {
            const d = event.date;
            const date = moment(d);
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{date.format("MMMM Do YYYY")}</TableCell>
                <TableCell>{date.format("dddd")}</TableCell>
                <TableCell>
                  {timingsByDate[date.format("MMMM Do YYYY")].count || 0}
                </TableCell>
                <TableCell>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    {timingsByDate[date.format("MMMM Do YYYY")].event.map(
                      (e, i) => {
                        return <DeleteEvent key={i} event={e}></DeleteEvent>;
                      }
                    )}
                  </ButtonGroup>
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
