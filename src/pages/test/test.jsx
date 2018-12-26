import React from 'react';

import axios from 'axios';


export default class test extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:9001/ec-election/nominations/1/payments`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    const test = this.state.persons

    return (
      <ul>
        <li>{this.state.persons.id}</li>
      </ul>
    )
  }
}
