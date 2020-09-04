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

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <EventList />
        <AddEvent />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
