import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";

const ADD_EVENT = gql`
  mutation AddEvent($date: String!) {
    addEvent(date: $date) {
      id
      date
    }
  }
`;

const AddEvent = () => {
  let input;
  const [addEvent, { data }] = useMutation(ADD_EVENT);
  const [complete, setComplete] = useState(false);

  return (
    <Container>
      {complete && (
        <Alert variant={"success"}>Successfully saved an event</Alert>
      )}
      <Button
        onClick={(e) => {
          e.preventDefault();
          const d = new Date();
          addEvent({ variables: { date: d.toString() } });
          setComplete(true);
        }}
      >
        Add Event
      </Button>
    </Container>
  );
};

export default AddEvent;
