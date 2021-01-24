import React, { Component } from 'react';
import './Leaderboard.css';
import EntryList from './components/EntryList';
import { Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sortedByRecent: false,
    };
  }

  componentDidMount() {
    this.sortByTotal();
  }

  async sortByTotal() {
    const { data } = await axios.get(
      `http://${process.env.REACT_APP_SERVER_URL}/users/leaderboard`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    );
    this.setState({ data: data });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Heading className="App-title">Leaderboard</Heading>
          <Text>Top players all around the world!</Text>
        </header>
        <section className="leaderboard">
          <div className="leaderboard__header">
            <p className="leaderboard__rank">Rank</p>
            <p className="leaderboard__name">Name</p>
            <p>Payout</p>
          </div>
          <EntryList entries={this.state.data} />
        </section>
      </div>
    );
  }
}

export default Leaderboard;
