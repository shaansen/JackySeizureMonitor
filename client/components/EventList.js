import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

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

  return (
    <div>
      {data.events.map((event, index) => {
        return <p key={index}>{event.date}</p>;
      })}
    </div>
  );
};

export default ExchangeRates;
