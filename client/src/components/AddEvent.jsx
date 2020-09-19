import React from "react";
import { Button } from "@material-ui/core";
import { initialData } from "./initialData"; // eslint-disable-line
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import * as actions from "../actions";
import { connect } from "react-redux";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dtp: new Date(),
      saveddtp: null,
      later: false,
      showNotification: false,
      notes: "",
    };
  }

  componentDidMount() {
    // console.log("Rendering once");
    // initialData.forEach((x) => {
    //   const d = moment(x.date, "DD/MM/YYYY hh:mmAZZ");
    //   console.log(d);
    //   this.props.addEvent({ notes: x.notes, date: d.toDate() });
    // });
  }

  render() {
    const { dtp, saveddtp, later, showNotification, notes } = this.state;

    const onChange = (date) => this.setState({ dtp: date });
    const addEvent = (date) => {
      this.props.addEvent({ notes: notes, date: date });
      this.setState({
        saveddtp: date,
        showNotification: true,
        notes: "",
      });
    };

    const textField = (
      <TextField
        id='outlined-multiline-static'
        label='Notes'
        multiline
        rows={4}
        value={notes}
        placeholder='Enter details like severity, medicines administered, injuries, etc.'
        variant='outlined'
        onChange={(e) => this.setState({ notes: e.target.value })}
      />
    );

    return (
      <React.Fragment>
        <div className='report-created-alert'>
          {showNotification &&
            `Successfully saved an event on Date ${moment(saveddtp)
              .tz(moment.tz.guess())
              .format("YYYY-MM-DD")} at Time ${moment(saveddtp)
              .tz(moment.tz.guess())
              .format("hh:mm:ss a")}`}
        </div>
        <div className='report-event-container'>
          {!later ? (
            <div className='report-event-now'>
              {textField}
              <Button
                variant='contained'
                color='primary'
                onClick={(e) => {
                  e.preventDefault();
                  const d = new Date();
                  addEvent(d);
                }}
              >
                Press to Report Epilepsy Now
              </Button>
              <Button onClick={() => this.setState({ later: true })}>
                Report event at custom time instead
              </Button>
            </div>
          ) : (
            <div className='report-event-custom'>
              <h4>Report at custom time</h4>
              {textField}
              {/* <Datetime value={dtp} defaultValue={dtp} onChange={onChange} /> */}
              <TextField
                id='datetime-local'
                type='datetime-local'
                defaultValue={
                  moment(dtp).tz(moment.tz.guess()).format("YYYY-MM-DD") +
                  "T" +
                  moment(dtp).tz(moment.tz.guess()).format("HH:mm")
                }
                onChange={(e) =>
                  onChange(
                    moment(e.target.value, "YYYY-MM-DDTHH:mm").tz(
                      moment.tz.guess()
                    )
                  )
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
                Press to Report Epilepsy Event
              </Button>
              <Button onClick={() => this.setState({ later: false })}>
                Report event now instead
              </Button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(mapStateToProps, actions)(AddEvent);
