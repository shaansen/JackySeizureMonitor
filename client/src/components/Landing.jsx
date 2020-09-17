import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ReportIcon from "@material-ui/icons/Report";
import GridOnIcon from "@material-ui/icons/GridOn";
import EventIcon from "@material-ui/icons/Event";
import Button from "@material-ui/core/Button";

const LandingPage = () => {
  return (
    <div className='landing-container'>
      <h2>Manage Jacky's Epilepsy Records</h2>
      <List>
        <ListItem>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary='Report Epilepsy Event' />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GridOnIcon />
          </ListItemIcon>
          <ListItemText primary='Manage Epilepsy Records' />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary='View Patterns/Trends' />
        </ListItem>
      </List>
      <Button variant='contained' color='secondary' href='/auth/google'>
        Sign In
      </Button>
    </div>
  );
};

export default LandingPage;
