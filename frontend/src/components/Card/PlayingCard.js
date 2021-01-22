import React from 'react';
import './PlayingCard.scss';

class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.value) {
      throw new Error('Value must be defined for playing cards');
    }
    if (!this.props.suit) {
      throw new Error('Suit must be defined for playing cards');
    }
  }

  render() {
    let val = this.props.value;
    // switch (this.props.value) {
    //   case 1:
    //     val = 'A';
    //     break;
    //   case 11:
    //     val = 'J';
    //     break;
    //   case 12:
    //     val = 'Q';
    //     break;
    //   case 13:
    //     val = 'K';
    //     break;
    //   default:
    //     val = this.props.value;
    //     break;
    //}

    const suit =
      this.props.suit === 'S' ? (
        <React.Fragment>&spades;</React.Fragment>
      ) : this.props.suit === 'D' ? (
        <React.Fragment>&diams;</React.Fragment>
      ) : this.props.suit === 'H' ? (
        <React.Fragment>&hearts;</React.Fragment>
      ) : this.props.suit === 'C' ? (
        <React.Fragment>&clubs;</React.Fragment>
      ) : (
        <React.Fragment>"N/A"</React.Fragment>
      );

    return (
      <div className={'playingCard' + ' ' + this.props.suit}>
        <div className="valueUpperLeft">{val}</div>
        <div className="valueUpperRight">{val}</div>
        <div className="valueLowerRight">{val}</div>
        <div className="valueLowerLeft">{val}</div>
        <div className="suitUpperLeft">{suit}</div>
        <div className="suitUpperRight">{suit}</div>
        <div className="suitLowerRight">{suit}</div>
        <div className="suitLowerLeft">{suit}</div>
      </div>
    );
  }
}

export default PlayingCard;
