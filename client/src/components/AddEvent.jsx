import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import { GET_EVENTS } from "./EventList";
import { initialData } from "./initialData"; // eslint-disable-line
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
  const [addEvent, { data }] = useMutation(ADD_EVENT); // eslint-disable-line
  const [complete, setComplete] = useState(false);
  const [dtp, setDTP] = useState(new Date());
  const [saveddtp, setsavedDTP] = useState(null);
  const [later, setLater] = useState(false);
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
    <React.Fragment>
      <div className='report-created-alert'>
        {complete && (
          <Alert severity='success'>
            Successfully saved an event on Date{" "}
            {moment(saveddtp).format("YYYY-MM-DD")} at Time{" "}
            {moment(saveddtp).format("hh:mm:ss a")}
          </Alert>
        )}
      </div>
      <div className='report-event-container'>
        {!later ? (
          <div className='report-event-now'>
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                setComplete(false);
                e.preventDefault();
                const d = new Date();
                addEvent({
                  variables: { date: d.toString() },
                  refetchQueries: [{ query: GET_EVENTS }],
                });
                setsavedDTP(d);
                setComplete(true);
              }}
            >
              Report Epilepsy Now
            </Button>
            <Button onClick={() => setLater(true)}>
              Report event at custom time instead
            </Button>
          </div>
        ) : (
          <div className='report-event-custom'>
            <h4>Report at custom time</h4>
            {/* <Datetime value={dtp} defaultValue={dtp} onChange={onChange} /> */}
            <TextField
              id='datetime-local'
              type='datetime-local'
              defaultValue={
                moment(dtp).format("YYYY-MM-DD") +
                "T" +
                moment(dtp).format("HH:mm")
              }
              onChange={(e) =>
                onChange(moment(e.target.value, "YYYY-MM-DDTHH:mm"))
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                setComplete(false);
                e.preventDefault();
                addEvent({
                  variables: { date: dtp },
                  refetchQueries: [{ query: GET_EVENTS }],
                });
                setsavedDTP(dtp);
                setComplete(true);
              }}
            >
              Report Epilepsy Event
            </Button>
            <Button onClick={() => setLater(false)}>
              Report event now instead
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AddEvent;
