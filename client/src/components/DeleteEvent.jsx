import { gql, useMutation } from "@apollo/client";
import React from "react";
import moment from "moment";
import { GET_EVENTS } from "./EventList";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

const DeleteEvent = (props) => {
  /* eslint-disable */
  const [deleteEvent, { data }] = useMutation(DELETE_EVENT); // eslint-disable-line
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const time = moment(props.event.date).format("h:mm:ss a");
  const date = moment(props.event.date).format("MMM da");
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
            Confirm that you want to delete epilepsy event at {time} on {date}?
            (This action is irreversible)
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
              deleteEvent({
                variables: { id: props.event.id },
                refetchQueries: [{ query: GET_EVENTS }],
              });
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
};

export default DeleteEvent;
