import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import Calendar from "./components/Calendar";
import LandingPage from "./components/Landing";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import GridOnIcon from "@material-ui/icons/GridOn";
import EventIcon from "@material-ui/icons/Event";
import "./style/styles.scss";
import Button from "@material-ui/core/Button";
import "./style/styles.scss";
import { connect } from "react-redux";
import * as actions from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const renderAuthInfo = () => {
      switch (this.props.auth) {
        case null:
          return <FontAwesomeIcon icon={faSpinner} />;

        case false:
          return (
            <Button variant='contained' color='secondary' href='/auth/google'>
              Sign In
            </Button>
          );

        default:
          return (
            <Button variant='contained' color='secondary' href='/api/logout'>
              Sign Out
            </Button>
          );
      }
    };

    const AppBarHeader = (
      <AppBar position='static'>
        <Toolbar>
          <div className='app-nav'>
            <div className='nav-app-name'>
              <Link to='/'>
                <Typography variant='h6'>Epilepsy Tracker</Typography>
              </Link>
            </div>
            <div className='nav-app-links'>
              <Link to='/'>
                <ReportIcon />
              </Link>
              <Link to='/table'>
                <GridOnIcon />
              </Link>
              <Link to='/calendar'>
                <EventIcon />
              </Link>
              {renderAuthInfo()}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );

    const renderLandingContainer = () => {
      if (!this.props.auth) {
        return <LandingPage />;
      } else {
        return <AddEvent />;
      }
    };

    return (
      <Router>
        <div className='app-container'>
          {AppBarHeader}
          <Switch>
            <Route path='/table'>
              <EventList />
            </Route>
            <Route path='/calendar'>
              <Calendar />
            </Route>
            <Route exact path='/'>
              {renderLandingContainer()}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, actions)(App);
