import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { initialData } from "./initialData"; // eslint-disable-line
import moment from "moment-timezone";
import TextField from "@material-ui/core/TextField";
import * as actions from "../actions";
import { connect } from "react-redux";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dtp: new Date(),
      saveddtp: null,
      later: false,
      showNotification: false,
      notes: "",
      disableButton: false,
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
    const {
      dtp,
      saveddtp,
      later,
      showNotification,
      notes,
      disableButton,
    } = this.state;

    const onChange = (date) => this.setState({ dtp: date });
    const addEvent = (date) => {
      this.setState(
        {
          disableButton: true,
        },
        async () => {
          const response = await this.props.addEvent({
            notes: notes,
            date: date,
          });
          if (response.status === 200) {
            this.setState(
              {
                saveddtp: date,
                showNotification: true,
                notes: "",
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    showNotification: false,
                    disableButton: false,
                  });
                }, 3000);
              }
            );
          }
        }
      );
    };

    const textField = (
      <TextField
        id="outlined-multiline-static"
        label="Notes"
        multiline
        rows={2}
        value={notes}
        placeholder="Enter details like severity, medicines administered, injuries, etc."
        variant="outlined"
        onChange={(e) => this.setState({ notes: e.target.value })}
      />
    );

    return (
      <React.Fragment>
        <div className="report-created-alert">
          {showNotification &&
            `Successfully saved an event on ${moment(saveddtp)
              .tz(moment.tz.guess())
              .format("MMM DD")} at ${moment(saveddtp)
              .tz(moment.tz.guess())
              .format("hh:mm A")}`}
        </div>
        <div className="report-event-container">
          {!later ? (
            <div className="report-event-now">
              {textField}
              <Button
                disabled={disableButton}
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  const d = new Date();
                  addEvent(d);
                }}
              >
                {!disableButton && "Press to Report Epilepsy Now"}
                <CircularProgress />
              </Button>
              <Button onClick={() => this.setState({ later: true })}>
                Report event at custom time instead
              </Button>
            </div>
          ) : (
            <div className="report-event-custom">
              {textField}
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  className="date-time-picker"
                  value={dtp}
                  onChange={(e) => {
                    onChange(moment(e).tz(moment.tz.guess()));
                  }}
                  label="Pick Date"
                  showTodayButton
                />
              </MuiPickersUtilsProvider>
              <Button
                variant="contained"
                color="primary"
                disabled={disableButton}
                onClick={(e) => {
                  e.preventDefault();
                  addEvent(dtp);
                }}
              >
                {!disableButton && "Press to Report Epilepsy Event"}
                <CircularProgress />
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
