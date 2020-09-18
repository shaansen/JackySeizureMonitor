import React from "react";
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
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";

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
            <React.Fragment>
              <Link to='/'>
                <ReportIcon />
              </Link>
              <Link to='/table'>
                <GridOnIcon />
              </Link>
              <Link to='/calendar'>
                <EventIcon />
              </Link>
              <Button variant='contained' color='secondary' href='/api/logout'>
                Sign Out
              </Button>
            </React.Fragment>
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
            <div className='nav-app-links'>{renderAuthInfo()}</div>
          </div>
        </Toolbar>
      </AppBar>
    );

    const renderContent = () => {
      if (this.props.auth == null) {
        return (
          <div>
            <CircularProgress />
          </div>
        );
      } else if (this.props.auth === false) {
        return <LandingPage />;
      } else {
        return (
          <Switch>
            <Route path='/table'>
              <EventList />
            </Route>
            <Route path='/calendar'>
              <Calendar />
            </Route>
            <Route exact path='/'>
              <AddEvent />
            </Route>
          </Switch>
        );
      }
    };

    return (
      <Router>
        <div className='app-container'>
          {AppBarHeader}
          {renderContent()}
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
