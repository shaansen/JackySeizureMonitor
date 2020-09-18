import React from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import * as actions from "../actions";
import { connect } from "react-redux";

class DeleteEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    const handleClickOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };
    const time = moment(this.props.event.date).format("h:mm:ss a");
    const date = moment(this.props.event.date).format("MMM d");
    const notes = this.props.event.notes || "No note added";
    return (
      <React.Fragment>
        <Button
          className='event-button'
          variant='contained'
          onClick={handleClickOpen}
        >
          {time}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{`${date} at ${time}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Notes : {notes}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                e.preventDefault();
                this.props.deleteEvent(this.props.event._id);
                this.props.refreshList();
                handleClose();
              }}
              autoFocus
            >
              Delete Event
            </Button>
            <Button onClick={handleClose} color='secondary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return { events };
};

export default connect(mapStateToProps, actions)(DeleteEvent);
