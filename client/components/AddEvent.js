import { gql, useMutation } from "@apollo/client";
import React from "react";

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

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          const d = new Date();
          addEvent({ variables: { date: d.toString() } });
        }}
      >
        Add Event
      </button>
    </div>
  );
};

export default AddEvent;
