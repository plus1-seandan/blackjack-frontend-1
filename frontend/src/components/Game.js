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
  Heading,
  Wrap,
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
      bet: 0,
      status: 'start',
    };
    this.newGame = this.newGame.bind(this);
    this.stand = this.stand.bind(this);
    this.handleBet = this.handleBet.bind(this);
    this.submitBet = this.submitBet.bind(this);
    this.dealCards = this.dealCards.bind(this);
    this.hit = this.hit.bind(this);
    this.doubleDown = this.doubleDown.bind(this);
    this.stand = this.stand.bind(this);
  }

  async componentDidMount() {
    const me = await getMe();
    const dealer = await getDealer();
    this.setState({ dealer: dealer });
    this.setState({ player: me });
  }

  async handleBet(amount) {
    this.setState({ bet: this.state.bet + amount });
  }

  async newGame(event) {
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
  }
  async submitBet() {
    await axios.patch(
      `http://localhost:8081/games/bet?game=${this.state.gameId}&player=${this.state.player.id}&bet=${this.state.bet}`,
    );
  }
  async doubleDown() {
    const { data } = await axios.patch(
      `http://localhost:8081/games/double?game=${
        this.state.gameId
      }&player=${this.state.player.id}&bet=${this.state.bet * 2}`,
    );
    this.handleBet(this.state.bet);
    this.setState({ playerHand: data });

    // const newBet = bet * 2;
    // console.log(newBet);

    // const cards = getCards(data.cards);

    // setHand(cards);
    // setMyPoints(data.points);
  }

  async dealCards() {
    //deal cards
    this.deal(this.state.player.id);
    //deal the players hand
    this.deal(-1);
    //deal the dealers hand
  }

  async deal(player) {
    const { data } = await axios.patch(
      `http://localhost:8081/games/deal?game=${this.state.gameId}&player=${player}`,
    );
    if (player == -1) {
      this.setState({ dealerHand: data });
    } else {
      this.setState({ playerHand: data });
    }
  }

  async hit() {
    const { data } = await axios.patch(
      `http://localhost:8081/games/hit?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
    this.setState({ playerHand: data });
    // const cards = getCards(data.cards);
    // setHand(cards);
    // setMyPoints(data.points);
  }

  async stand() {
    this.setState({ status: 'stand' });
    const { data } = await axios.patch(
      `http://localhost:8081/games/stand?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
    console.log(data);
    this.setState({ dealerHand: data });

    // setDealerHand(cards);
    // setDealerPoints(data.points);
    // const settle = await axios.patch(
    //   `http://localhost:8081/games/settle?game=${gameId}&player=${PLAYER_ID}`,
    // );
    // console.log(settle);
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
          <Text>{this.state.gameId}</Text>
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
                  this.state.dealerHand.cards.map((card, index) => {
                    return formatDealerCard(
                      card,
                      index,
                      this.state.status,
                    );
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
            <Box position="absolute" left="0">
              <VStack>
                <Heading>Bet: ${this.state.bet}</Heading>
                <Heading zIndex={1}>
                  Points:{' '}
                  {this.state.playerHand
                    ? this.state.playerHand.points
                    : 0}
                </Heading>
              </VStack>
            </Box>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.newGame}
            >
              New Game
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.submitBet}
            >
              Bet
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.dealCards}
            >
              Deal
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.hit}
            >
              Hit
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.doubleDown}
            >
              Double
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.stand}
            >
              Stand
            </Button>
          </Box>
          <Box d="flex" justifyContent="flex-end">
            <Box pr="200px">
              <Wrap>
                {this.state.playerHand &&
                  this.state.playerHand.cards.map((card) => {
                    return formatCard(card);
                  })}
              </Wrap>
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
            <Chips handleBet={this.handleBet} />
          </Box>
        </GridItem>
      </Grid>
    );
  }
}

export default Game;
