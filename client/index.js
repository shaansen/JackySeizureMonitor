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
import { Navbar, Nav } from "react-bootstrap";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            Jacky Seizure Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Report Event
              </Nav.Link>
              <Nav.Link as={Link} to="/table">
                Table View
              </Nav.Link>
              <Nav.Link as={Link} to="/calendar">
                Calendar View
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/table">
            <AddEvent />
          </Route>
          <Route path="/calendar">
            <AddEvent />
          </Route>
          <Route path="/">
            <EventList />
          </Route>
        </Switch>
      </ApolloProvider>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
