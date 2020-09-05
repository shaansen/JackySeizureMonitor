import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { GET_EVENTS } from "./EventList";
import Datetime from "react-datetime";
import "./react-datetime.css";
import { initialData } from "./initialData";
import moment from "moment";

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
  const [dtp, setDTP] = useState(new Date());
  const onChange = (date) => setDTP(date);

  //   useEffect(() => {
  //     console.log("Rendering once")
  // initialData.forEach(date => {
  //     const d = moment(date,"DD/MM/YYYY hh:mmA");
  //     addEvent({
  //               variables: { date: d },
  //               refetchQueries: [{ query: GET_EVENTS }],
  //             });
  //   })
  //   }, [])

  return (
    <div>
      {complete && (
        <Alert variant={"success"}>Successfully saved an event</Alert>
      )}

      <Button
        onClick={(e) => {
          e.preventDefault();
          const d = new Date();
          addEvent({
            variables: { date: d.toString() },
            refetchQueries: [{ query: GET_EVENTS }],
          });
          setComplete(true);
        }}
      >
        Report Epilepsy Now
      </Button>
      <hr />
      <div>
        <h4>Report at custom time</h4>
        <Datetime value={dtp} defaultValue={dtp} onChange={onChange} />
        <Button
          onClick={(e) => {
            e.preventDefault();
            addEvent({
              variables: { date: dtp },
              refetchQueries: [{ query: GET_EVENTS }],
            });
            setComplete(true);
          }}
        >
          Report Epilepsy Now
        </Button>
      </div>
    </div>
  );
};

export default AddEvent;
