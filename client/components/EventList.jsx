import React, { useEffect } from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Table } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";
import DeleteEvent from "./DeleteEvent";

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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Date</th>
          <th>Day</th>
          <th>Recurrence</th>
          <th>Times</th>
        </tr>
      </thead>
      <tbody>
        {filteredDates.map((event, index) => {
          const d = event.date;
          const date = moment(d);
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{date.format("MMMM Do YYYY")}</td>
              <td>{date.format("dddd")}</td>
              <td>{timingsByDate[date.format("MMMM Do YYYY")].count || 0}</td>
              <td>
                <ul>
                  {timingsByDate[date.format("MMMM Do YYYY")].event.map(
                    (e, i) => {
                      return <DeleteEvent key={i} event={e}></DeleteEvent>;
                    }
                  )}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default EventList;
