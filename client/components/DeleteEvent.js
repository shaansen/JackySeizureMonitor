import { gql, useMutation } from "@apollo/client";
import React from "react";
import moment from "moment";
import { Container, Button, Alert } from "react-bootstrap";

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

const DeleteEvent = (props) => {
  let input;
  const [deleteEvent, { data }] = useMutation(DELETE_EVENT);
  const time = moment(props.event.date).format("h:mm:ss a");
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        const d = new Date();
        deleteEvent({ variables: { id: props.event.id } });
      }}
    >
      {time}
    </Button>
  );
};

export default DeleteEvent;
