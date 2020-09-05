import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import Calendar from "./components/Calendar";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import {
  MenuIcon,
  Search,
  AccountCircle,
  Mail,
  Notifications,
  MoreVert,
} from "@material-ui/icons";
import ReportIcon from "@material-ui/icons/Report";
import GridOnIcon from "@material-ui/icons/GridOn";
import EventIcon from "@material-ui/icons/Event";
import "./style/styles.scss";

function App() {
  const AppBarHeader = (
    <AppBar position="static">
      <Toolbar>
        <div className="app-nav">
          <div className="nav-app-name">
            <Link to="/">
              <Typography variant="h6">Epilepsy Tracker</Typography>
            </Link>
          </div>
          <div className="nav-app-links">
            <Link to="/">
              <ReportIcon />
            </Link>
            <Link to="/table">
              <GridOnIcon />
            </Link>
            <Link to="/calendar">
              <EventIcon />
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );

  return (
    <div>
      <ApolloProvider client={client}>
        {AppBarHeader}

        <Switch>
          <Route path="/table">
            <EventList />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/">
            <AddEvent />
          </Route>
        </Switch>
      </ApolloProvider>
    </div>
  );
}

render(
  <Router basename={"/"}>
    <App />
  </Router>,
  document.getElementById("root")
);
