import React from "react";
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

const ExchangeRates = () => {
  const { loading, error, data } = useQuery(gql`
    {
      events {
        date
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredDates = _.uniqBy(data.events, (d) => {
    const date = moment(d.date);
    return date.format("MMMM Do YYYY");
  });

  const timingsByDate = {};

  _.forEach(data.events, (d) => {
    const date = moment(d.date).format("MMMM Do YYYY");
    const time = moment(d.date).format("h:mm:ss a");
    if (timingsByDate[date] !== undefined) {
      timingsByDate[date].count = timingsByDate[date].count + 1;
      timingsByDate[date].times = [...timingsByDate[date].times, time];
    } else {
      timingsByDate[date] = {
        count: 1,
        times: [],
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
          <th>Actions</th>
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
              <td>{timingsByDate[date.format("MMMM Do YYYY")].count}</td>
              <td>
                <ul>
                  {timingsByDate[date.format("MMMM Do YYYY")].times.map(
                    (time, i) => (
                      <li key={i}>{time}</li>
                    )
                  )}
                </ul>
              </td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ExchangeRates;
