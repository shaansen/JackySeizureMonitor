import * as React from "react";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";

const EventList = (props) => {
  const events = props.data.events;
  if(events === undefined) {
    return null;
  }
  return <div>{events.map((event) => {
    return <div key={event.date}>{event.date}</div>
  })}</div>
}

const query = gql`
{
  events {
    date
  }
}
`;

export default graphql(query)(EventList);