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
import {
  displayBetButton,
  displayNewGameButton,
  displayDealButton,
  displayHitButton,
  displayDoubleButton,
  displayStandButton,
} from '../util/game.js';
import GameStatusModal from '../GameStatusModal.js';

const initState = {
  dealer: null,
  player: null,
  gameId: '',
  dealerHand: null,
  playerHand: null,
  message: 'Start a New Game!',
  bet: 0,
  actions: [],
  payout: 0,
  status: null,
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initState,
    };
    this.newGame = this.newGame.bind(this);
    this.stand = this.stand.bind(this);
    this.handleBet = this.handleBet.bind(this);
    this.submitBet = this.submitBet.bind(this);
    this.dealCards = this.dealCards.bind(this);
    this.hit = this.hit.bind(this);
    this.doubleDown = this.doubleDown.bind(this);
    this.stand = this.stand.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  async componentDidMount() {
    const me = await getMe();
    const dealer = await getDealer();
    this.setState({ dealer: dealer });
    this.setState({ player: me });
  }

  async resetState() {
    await this.setState({
      ...initState,
    });
    await this.setPlayerAndDealer();
  }

  async setPlayerAndDealer() {
    const me = await getMe();
    const dealer = await getDealer();
    this.setState({ dealer: dealer });
    this.setState({ player: me });
  }

  updateActions(action) {
    this.setState({ actions: this.state.actions.concat(action) });
  }
  async handleBet(amount) {
    this.setState({ bet: this.state.bet + amount });
  }

  async newGame(event) {
    //reset state
    this.resetState();
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
    this.updateActions('new game');
  }
  async submitBet() {
    await axios.patch(
      `http://localhost:8081/games/bet?game=${this.state.gameId}&player=${this.state.player.id}&bet=${this.state.bet}`,
    );
    this.updateActions('bet');
  }
  async doubleDown() {
    const { data } = await axios.patch(
      `http://localhost:8081/games/double?game=${
        this.state.gameId
      }&player=${this.state.player.id}&bet=${this.state.bet * 2}`,
    );
    this.handleBet(this.state.bet);
    this.setState({ playerHand: data });
    this.updateActions('double');
  }

  async dealCards() {
    //deal cards
    this.deal(this.state.player.id);
    //deal the players hand
    this.deal(-1);
    //deal the dealers hand
    this.updateActions('deal');
  }
  onClose() {
    this.setState({ status: null });
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
    this.updateActions('hit');
  }

  async stand() {
    this.setState({ status: 'stand' });
    const { data } = await axios.patch(
      `http://localhost:8081/games/stand?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
    const { data: _data } = await axios.patch(
      `http://localhost:8081/games/settle?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
    // console.log(settle);
    console.log(_data);
    this.setState({
      dealerHand: data,
      status: _data.status,
      payout: _data.payout,
    });
    this.updateActions('stand');
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
          <GameStatusModal
            payout={this.state.payout}
            status={this.state.status}
            newGame={this.newGame}
            isOpen={this.state.status ? true : false}
            onClose={this.onClose}
          />
          <Image
            borderRadius="full"
            border="solid"
            borderColor="gray.200"
            boxSize="150px"
            src={this.state.dealer?.image}
            alt="Dealer"
          />
          <Text>Dealer: {this.state.dealer?.username}</Text>
          {this.state.status ? (
            <Box position="absolute" left="0">
              <Heading zIndex={1}>
                Points:{' '}
                {this.state.dealerHand
                  ? this.state.dealerHand.points
                  : 0}
              </Heading>
            </Box>
          ) : null}
          <Box>
            <Center>
              <HStack>
                {this.state.dealerHand &&
                  this.state.dealerHand.cards.map((card, index) => {
                    return formatDealerCard(
                      card,
                      index,
                      this.state.actions,
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
              isDisabled={displayNewGameButton(this.state.actions)}
            >
              New Game
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.submitBet}
              isDisabled={displayBetButton(this.state.actions)}
            >
              Bet
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.dealCards}
              isDisabled={displayDealButton(this.state.actions)}
            >
              Deal
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.hit}
              isDisabled={displayHitButton(this.state.actions)}
            >
              Hit
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.doubleDown}
              isDisabled={displayDoubleButton(this.state.actions)}
            >
              Double
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              m="3"
              onClick={this.stand}
              isDisabled={displayStandButton(this.state.actions)}
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
