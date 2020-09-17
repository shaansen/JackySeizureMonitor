import React from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
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
    const date = moment(this.props.event.date).format("MMM da");

    return (
      <React.Fragment>
        <Button
          className='event-button'
          startIcon={<CloseIcon />}
          variant='contained'
          color='secondary'
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
          <DialogTitle id='alert-dialog-title'>
            {"Delete Epilepsy Event"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Confirm that you want to delete epilepsy event at {time} on {date}
              ? (This action is irreversible)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                e.preventDefault();
                this.props.deleteEvent(this.props.event._id);
                this.props.refreshList();
                handleClose();
              }}
              color='primary'
              autoFocus
            >
              Delete Event
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
