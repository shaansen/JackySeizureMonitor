import React from "react";
import { withRouter } from "react-router-dom";

import ReportIcon from "@material-ui/icons/Report";
import GridOnIcon from "@material-ui/icons/GridOn";
import EventIcon from "@material-ui/icons/Event";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class DrawerComponent extends React.Component {
  render() {
    const list = (anchor) => (
      <div role='presentation'>
        <List>
          <ListItem
            button
            onClick={() => {
              this.props.toggleSideBar(false);
              this.props.history.push("/");
            }}
          >
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary='Report Epilepsy Event' />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              this.props.toggleSideBar(false);
              this.props.history.push("/table");
            }}
          >
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary='Manage Epilepsy Records' />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              this.props.toggleSideBar(false);
              this.props.history.push("/calendar");
            }}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary='View Calendar' />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              this.props.toggleSideBar(false);
              this.props.history.push("/trend");
            }}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary='View Trends' />
          </ListItem>
        </List>
      </div>
    );

    const anchor = "left";
    const drawer = (
      <Drawer
        anchor={anchor}
        open={this.props.sidebarOpen}
        onClose={() => this.props.toggleSideBar(false)}
      >
        <div className='you-can'>You can</div>
        <Divider />
        {list(anchor)}
      </Drawer>
    );

    return drawer;
  }
}

export default withRouter(DrawerComponent);
