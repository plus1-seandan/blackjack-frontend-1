import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealerHand: null,
      playerHand: null,
      message: 'Start a New Game!',
    }
    this.newGame = this.newGame.bind(this);
    this.getCard = this.getCard.bind(this);
    this.stand = this.stand.bind(this);
  }

  newGame() {
    console.log(this.state.dealerHand);
  }

  getCard() {
    console.log(this.state.playerHand);
  }
  stand() {
    console.log(this.state.playerHand);
  }

  render () {
    return (
      <div>
        <p>{this.state.message}</p>
        <div>
          <button onClick={this.newGame}>New Game</button>
        </div>
        <div>
          <p>Dealer's Hand {this.state.dealerHand}</p>
          <p>Your Hand {this.state.playerHand}</p>
        </div>
        <div>
          <button onClick={this.getCard}>Hit</button>
          <button onClick={this.stand}>Stand</button>
        </div>
      </div>
    )
  }
}

export default Game;