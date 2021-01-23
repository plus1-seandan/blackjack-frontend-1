import React, { Component } from 'react';
import '../Leaderboard.css';

class EntryList extends Component {
  render() {
    const entry = this.props.entries.map((entry, i) => {
      return (
        <li key={i} className="leaderboard__entry">
          <p className="leaderboard__rank">{i + 1}</p>
          <p className="leaderboard__name"> {entry.username}</p>
          <p className="leaderboard__totalPoints">
            $ {entry.total_payout}
          </p>
        </li>
      );
    });

    return <ul>{entry}</ul>;
  }
}

export default EntryList;
