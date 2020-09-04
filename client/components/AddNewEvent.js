import * as React from "react";
import gql from 'graphql-tag';
import { graphql } from "react-apollo";

class AddNewEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    event: null
  }
  }

  

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    this.props.mutate({
      variables: {
        date: this.state.event
      }
    })
  }

  render() {

  return <form onSubmit={this.onSubmit.bind(this)}>
    <button 
      onClick={() => {
        var d = new Date();
        var n = d.toString();
        this.setState({ event: n})
      }}
    >Add Event</button>
  </form>;
  }
}

const mutation = gql`
  mutation AddEvent($date: String){
    addEvent(date: $date) {
      date
    }
  }
`;

export default graphql(mutation)(AddNewEvent);