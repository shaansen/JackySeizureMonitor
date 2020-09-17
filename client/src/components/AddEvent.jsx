import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import { GET_EVENTS } from "./EventList";
import { initialData } from "./initialData"; // eslint-disable-line
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import * as actions from "../actions";
import { connect } from "react-redux";

const AddEvent = (props) => {
  const [dtp, setDTP] = useState(new Date());
  const [saveddtp, setsavedDTP] = useState(null);
  const [later, setLater] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const onChange = (date) => setDTP(date);
  const addEvent = (date) => {
    props.addEvent({ notes: "Something" });
    setsavedDTP(date);
    setShowNotification(true);
  };

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
        {showNotification &&
          `Successfully saved an event on Date ${moment(saveddtp).format(
            "YYYY-MM-DD"
          )} at Time ${moment(saveddtp).format("hh:mm:ss a")}`}
      </div>
      <div className='report-event-container'>
        {!later ? (
          <div className='report-event-now'>
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                e.preventDefault();
                const d = new Date();
                addEvent(d);
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
                e.preventDefault();
                addEvent(dtp);
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

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(mapStateToProps, actions)(AddEvent);
