import { Box, Grid, GridItem, Button, Text} from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';
import {getMe} from '../util/user.js';
import { formatCard } from '../util/card.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      gameId: '',
      dealerHand: null,
      playerHand: null,
      message: 'Start a New Game!',
    }
    this.newGame = this.newGame.bind(this);
    this.getCard = this.getCard.bind(this);
    this.stand = this.stand.bind(this);
  }

  async componentDidMount() {
    const me = await getMe();
    this.setState({player: me})
  }

  async newGame(event) {
    event.preventDefault();
    //create a new game 
    const {data} = await axios.post('http://localhost:8081/games', {},{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    });
    this.setState({gameId: data}); 
    //deal cards 
    this.deal(this.state.player.id)
    //deal the players hand 
    this.deal(-1)
    //deal the dealers hand 
  }

  async deal(player) {
    // { cards, game, player, points },
    const { data } = await axios.patch(
      `http://localhost:8081/games/deal?game=${this.state.gameId}&player=${player}`
    );
    if(player == -1){
      this.setState({dealerHand: data.cards})
    }else{
      this.setState({playerHand: data.cards})
    }
  };

  getCard() {
    console.log(this.state.playerHand);
  }
  stand() {
    console.log(this.state.playerHand);
  }

  render () {
    return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
      bg="tomato"
    >
      <GridItem rowStart={1} rowEnd={6} colStart={1} colEnd={13} bg="#E53E3E">
        <Text>{this.state.gameId}</Text>
        DEALER
        <Box>
          {this.state.dealerHand && this.state.dealerHand.map((card) => {
             return formatCard(card)
          })}
        </Box>
      </GridItem>
      <GridItem rowStart={6} rowEnd={13} colStart={1} colEnd={13} bg="#2F855A">
        <Text>{this.state.player?.username}</Text>
        <Box d="flex" justifyContent="center">
          <h3>{this.state.message}</h3>
        </Box>
        <Box d="flex" justifyContent="center">
          <Button colorScheme="teal" size="sm" onClick={this.newGame}>Deal</Button>
          <Button colorScheme="teal" size="sm">Hit</Button>
          <Button colorScheme="teal" size="sm">Stand</Button>
        </Box>
        <Box>
          {this.state.playerHand && this.state.playerHand.map((card) => {
             return formatCard(card)
          })}
        </Box>
      </GridItem>
    </Grid>
    )
  }
}

export default Game;