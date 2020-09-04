import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { GET_EVENTS } from "./EventList";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

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

        <DateTimePicker
          amPmAriaLabel="Select AM/PM"
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
          dayAriaLabel="Day"
          hourAriaLabel="Hour"
          maxDetail="second"
          minuteAriaLabel="Minute"
          monthAriaLabel="Month"
          nativeInputAriaLabel="Date and time"
          onChange={onChange}
          secondAriaLabel="Second"
          value={dtp}
          yearAriaLabel="Year"
        />
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
