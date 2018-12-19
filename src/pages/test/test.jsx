import React from 'react';

import axios from 'axios';

export default class test extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://192.168.8.104:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/teams/5eedb70e-a4da-48e0-b971-e06cd19ecc70/nominations/approve`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.id}</li>)}
      </ul>
    )
  }
}
