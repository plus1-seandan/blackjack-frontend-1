import React from 'react';
import './Chips.scss';

class Chips extends React.Component {
  render() {
    return (
      <>
        <div class="chips">
          <div
            class="pokerchip white"
            onClick={() => {
              this.props.handleBet(1);
            }}
          ></div>
          <div
            class="pokerchip red"
            onClick={() => {
              this.props.handleBet(5);
            }}
          ></div>
          <div
            class="pokerchip blue"
            onClick={() => {
              this.props.handleBet(10);
            }}
          ></div>
          <div
            class="pokerchip green"
            onClick={() => {
              this.props.handleBet(25);
            }}
          ></div>
          <div
            class="pokerchip black"
            onClick={() => {
              this.props.handleBet(100);
            }}
          ></div>
        </div>
      </>
    );
  }
}

export default Chips;
