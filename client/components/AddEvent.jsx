import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import { GET_EVENTS } from "./EventList";
import "./react-datetime.css";
import { initialData } from "./initialData";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

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
        <Alert severity="success">
          Successfully saved an event on Date {moment(dtp).format("YYYY-MM-DD")}{" "}
          at Time {moment(dtp).format("hh:mm:ss a")}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
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
        {/* <Datetime value={dtp} defaultValue={dtp} onChange={onChange} /> */}
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          defaultValue={
            moment(dtp).format("YYYY-MM-DD") + "T" + moment(dtp).format("HH:mm")
          }
          onChange={(e) => onChange(moment(e.target.value, "YYYY-MM-DDTHH:mm"))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            addEvent({
              variables: { date: dtp },
              refetchQueries: [{ query: GET_EVENTS }],
            });
            setComplete(true);
          }}
        >
          Report Epilepsy Event
        </Button>
      </div>
    </div>
  );
};

export default AddEvent;
