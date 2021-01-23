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
import { hasBet, isGameOver } from '../util/game.js';
import GameStatusModal from '../GameStatusModal.js';
import GameButtons from './GameButtons.js';

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
  busted: false,
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
    if (hasBet(this.state.actions)) {
      return;
    }
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
    if (isGameOver(data.points)) {
      this.handleGameOver(data.points);
    }
  }
  async handleGameOver(points) {
    if (points > 21) {
      const { data: _data } = await axios.patch(
        `http://localhost:8081/games/settle?game=${this.state.gameId}&player=${this.state.player.id}`,
      );
      this.setState({
        status: _data.status,
        payout: _data.payout,
        busted: true,
      });
      // this.setState({ status: 'lose', busted: true });
    } else {
      this.stand();
    }
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
      if (isGameOver(data.points)) {
        this.handleGameOver(data.points);
      }
    }
  }

  async hit() {
    const { data } = await axios.patch(
      `http://localhost:8081/games/hit?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
    this.setState({ playerHand: data });
    this.updateActions('hit');
    if (isGameOver(data.points)) {
      this.handleGameOver(data.points);
    }
  }

  async stand() {
    this.setState({ status: 'stand' });
    const { data } = await axios.patch(
      `http://localhost:8081/games/stand?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
    const { data: _data } = await axios.patch(
      `http://localhost:8081/games/settle?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
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
          <Text color="white">{this.state.dealer?.username}</Text>
          {this.state.status ? (
            <Box position="absolute" left="0">
              <Heading zIndex={1}>
                Points:{' '}
                {this.state.dealerHand
                  ? this.state.dealerHand.points > 21
                    ? 'Busted'
                    : this.state.dealerHand.points
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
                    ? this.state.playerHand.points > 21
                      ? 'Busted'
                      : this.state.playerHand.points
                    : 0}
                </Heading>
              </VStack>
            </Box>
            <GameButtons
              actions={this.state.actions}
              busted={this.state.busted}
              newGame={this.newGame}
              stand={this.stand}
              hit={this.hit}
              submitBet={this.submitBet}
              dealCards={this.dealCards}
              doubleDown={this.doubleDown}
            />
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
              <Text color="white">{this.state.player?.username}</Text>
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
