import {
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  HStack,
  Center,
  Image,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';
import { getMe, getDealer } from '../util/user.js';
import { formatCard, formatDealerCard } from '../util/card.js';
import Chips from './Chips/Chips.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealer: null,
      player: null,
      gameId: '',
      dealerHand: null,
      playerHand: null,
      message: 'Start a New Game!',
    };
    this.newGame = this.newGame.bind(this);
    this.getCard = this.getCard.bind(this);
    this.stand = this.stand.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  async componentDidMount() {
    const me = await getMe();
    const dealer = await getDealer();
    this.setState({ dealer: dealer });
    this.setState({ player: me });
  }

  changeColor = () => {
    console.log('trigger change color');
  };

  async newGame(event) {
    event.preventDefault();
    //create a new game
    const { data } = await axios.post(
      'http://localhost:8081/games',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    );
    this.setState({ gameId: data });
    //deal cards
    this.deal(this.state.player.id);
    //deal the players hand
    this.deal(-1);
    //deal the dealers hand
  }

  async deal(player) {
    // { cards, game, player, points },
    const { data } = await axios.patch(
      `http://localhost:8081/games/deal?game=${this.state.gameId}&player=${player}`,
    );
    if (player == -1) {
      this.setState({ dealerHand: data.cards });
    } else {
      this.setState({ playerHand: data.cards });
    }
  }

  getCard() {
    console.log(this.state.playerHand);
  }
  stand() {
    console.log(this.state.playerHand);
  }

  render() {
    return (
      <Grid
        h="100vh"
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(12, 1fr)"
      >
        <GridItem
          rowStart={1}
          rowEnd={6}
          colStart={1}
          colEnd={13}
          bg="#35654d"
          borderBottom="solid"
          borderColor="tomato"
        >
          <Image
            borderRadius="full"
            border="solid"
            borderColor="gray.200"
            boxSize="150px"
            src={this.state.dealer?.image}
            alt="Dealer"
          />
          <Text>Dealer: {this.state.dealer?.username}</Text>
          <Box>
            <Center>
              <HStack>
                {this.state.dealerHand &&
                  this.state.dealerHand.map((card, index) => {
                    return formatDealerCard(card, index);
                  })}
              </HStack>
            </Center>
          </Box>
        </GridItem>
        <GridItem
          rowStart={6}
          rowEnd={13}
          colStart={1}
          colEnd={13}
          bg="#35654d"
        >
          <Box d="flex" justifyContent="center">
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.newGame}
            >
              Deal
            </Button>
            <Button colorScheme="teal" size="sm" m="3">
              Hit
            </Button>
            <Button colorScheme="teal" size="sm" m="3">
              Stand
            </Button>
          </Box>
          <Box d="flex" justifyContent="flex-end">
            <Box position="relative" right="35%">
              <HStack>
                {this.state.playerHand &&
                  this.state.playerHand.map((card) => {
                    return formatCard(card);
                  })}
              </HStack>
            </Box>
            <VStack>
              <Image
                borderRadius="full"
                boxSize="150px"
                border="solid"
                borderColor="gray.200"
                src={this.state.player?.image}
                alt={this.state.player?.username}
              />
              <Text>Player: {this.state.player?.username}</Text>
            </VStack>
          </Box>
          <Box pt="50px">
            <Chips changeColor={this.changeColor} />
          </Box>
        </GridItem>
      </Grid>
    );
  }
}

export default Game;
