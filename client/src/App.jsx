import React, { Suspense } from "react";
import "./style/styles.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  AppBar,
  Button,
  CircularProgress,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import MenuIcon from "@material-ui/icons/Menu";
import * as actions from "./actions";
import LandingPage from "./components/Landing";
import Drawer from "./components/Drawer";

const Trend = React.lazy(() => import("./components/Trend"));
const EventList = React.lazy(() => import("./components/EventList"));
const AddEvent = React.lazy(() => import("./components/AddEvent"));
const Calendar = React.lazy(() => import("./components/Calendar"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  toggleSideBar = (val) => {
    this.setState({ sidebarOpen: val });
  };

  render() {
    const renderAuthInfo = () => {
      switch (this.props.auth) {
        case null:
          return <FontAwesomeIcon icon={faSpinner} />;

        case false:
          return null;

        default:
          return (
            <Button variant="contained" color="secondary" href="/api/logout">
              Sign Out
            </Button>
          );
      }
    };

    const AppBarHeader = (
      <AppBar position="sticky">
        <Toolbar>
          <div className="app-nav">
            <div className="nav-app-name">
              {!!this.props.auth && (
                <MenuIcon
                  onClick={() => this.setState({ sidebarOpen: true })}
                />
              )}
              <Link className="app-name" to="/">
                <Typography variant="h6">Epilepsy Journal</Typography>
              </Link>
            </div>
            <div className="nav-app-links">{renderAuthInfo()}</div>
          </div>
        </Toolbar>
      </AppBar>
    );

    const renderContent = () => {
      if (this.props.auth === null) {
        return (
          <div>
            <CircularProgress />
          </div>
        );
      } else if (this.props.auth === false) {
        return <LandingPage />;
      } else {
        return (
          <React.Fragment>
            <Switch>
              <Route path="/table">
                <Suspense fallback={<div>Loading...</div>}>
                  <EventList />
                </Suspense>
              </Route>
              <Route path="/calendar">
                <Suspense fallback={<div>Loading...</div>}>
                  <Calendar />
                </Suspense>
              </Route>
              <Route path="/trend">
                <Suspense fallback={<div>Loading...</div>}>
                  <Trend />
                </Suspense>
              </Route>
              <Route exact path="/">
                <Suspense fallback={<div>Loading...</div>}>
                  <AddEvent />
                </Suspense>
              </Route>
            </Switch>
          </React.Fragment>
        );
      }
    };

    return (
      <Router>
        <div className="app-container">
          <Drawer
            sidebarOpen={this.state.sidebarOpen}
            toggleSideBar={this.toggleSideBar}
          />
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
