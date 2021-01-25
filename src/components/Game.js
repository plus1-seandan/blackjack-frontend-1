import {
  Box,
  Grid,
  GridItem,
  Text,
  HStack,
  Center,
  Image,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';
import { getMe } from '../util/user.js';
import { formatCard, formatDealerCard } from '../util/card.js';
import { hasBet, isGameOver } from '../util/game.js';
import GameStatusModal from './GameStatusModal.js';
import GameButtons from './GameButtons.js';
import GameChips from './GameChips.js';

const initState = {
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
    this.setState({ player: me });
  }

  async resetState() {
    await this.setState({
      ...initState,
    });
    await this.setPlayerInfo();
  }

  async setPlayerInfo() {
    const me = await getMe();
    this.setState({ player: me });
  }

  updateActions(action) {
    this.setState({ actions: this.state.actions.concat(action) });
  }
  async handleBet(amount, action) {
    if (hasBet(this.state.actions) && !action) {
      return;
    }
    this.setState({ bet: this.state.bet + amount });
  }

  async newGame(event) {
    //reset state
    this.resetState();
    //create a new game
    const { data } = await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}/games`,
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
      `http://${process.env.REACT_APP_SERVER_URL}/games/bet?game=${this.state.gameId}&player=${this.state.player.id}&bet=${this.state.bet}`,
    );
    this.updateActions('bet');
  }
  async doubleDown() {
    const { data } = await axios.patch(
      `http://${process.env.REACT_APP_SERVER_URL}/games/double?game=${
        this.state.gameId
      }&player=${this.state.player.id}&bet=${this.state.bet * 2}`,
    );
    this.handleBet(this.state.bet, 'double');
    this.setState({ playerHand: data });
    this.updateActions('double');
    if (isGameOver(data.points)) {
      this.handleGameOver(data.points);
    }
  }
  async handleGameOver(points) {
    if (points > 21) {
      const { data: _data } = await axios.patch(
        `http://${process.env.REACT_APP_SERVER_URL}/games/settle?game=${this.state.gameId}&player=${this.state.player.id}`,
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
      `http://${process.env.REACT_APP_SERVER_URL}/games/deal?game=${this.state.gameId}&player=${player}`,
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
      `http://${process.env.REACT_APP_SERVER_URL}/games/hit?game=${this.state.gameId}&player=${this.state.player.id}`,
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
      `http://${process.env.REACT_APP_SERVER_URL}/games/stand?game=${this.state.gameId}&player=${this.state.player.id}`,
    );
    const { data: _data } = await axios.patch(
      `http://${process.env.REACT_APP_SERVER_URL}/games/settle?game=${this.state.gameId}&player=${this.state.player.id}`,
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
        h="100%"
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(12, 1fr)"
      >
        <GameStatusModal
          payout={this.state.payout}
          status={this.state.status}
          newGame={this.newGame}
          isOpen={this.state.status ? true : false}
          onClose={this.onClose}
        />
        <GridItem
          rowStart={1}
          rowEnd={5}
          colStart={1}
          colEnd={3}
          bg="#35654d"
        >
          <Dealer
            dealer={this.state.dealer}
            status={this.state.status}
            hand={this.state.dealerHand}
          />
        </GridItem>
        <GridItem
          rowStart={1}
          rowEnd={5}
          colStart={3}
          colEnd={13}
          bg="#35654d"
        >
          <DealerHand
            actions={this.state.actions}
            hand={this.state.dealerHand}
          />
        </GridItem>
        <GridItem
          rowStart={5}
          rowEnd={6}
          colStart={1}
          colEnd={13}
          bg="#35654d"
          borderTop="solid"
          borderColor="tomato"
        >
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
        </GridItem>
        <GridItem
          rowStart={6}
          rowEnd={10}
          colStart={11}
          colEnd={13}
          bg="#35654d"
        >
          <Player
            player={this.state.player}
            bet={this.state.bet}
            hand={this.state.playerHand}
          />
        </GridItem>
        <GridItem
          rowStart={6}
          rowEnd={10}
          colStart={1}
          colEnd={11}
          bg="#35654d"
        >
          <PlayerHand hand={this.state.playerHand} />
        </GridItem>
        <GridItem
          rowStart={10}
          rowEnd={13}
          colStart={1}
          colEnd={13}
          bg="#35654d"
        >
          <GameChips handleBet={this.handleBet} />
        </GridItem>
      </Grid>
    );
  }
}

export default Game;

const PlayerHand = ({ hand }) => {
  return (
    <Box d="flex" h="100%" justifyContent="center">
      <Center>
        <HStack>
          {hand &&
            hand.cards.map((card) => {
              return formatCard(card);
            })}
        </HStack>
      </Center>
    </Box>
  );
};

const DealerHand = ({ actions, hand }) => {
  return (
    <Box d="flex" h="100%" justifyContent="center">
      <Center>
        <HStack>
          {hand &&
            hand.cards.map((card, index) => {
              return formatDealerCard(card, index, actions);
            })}
        </HStack>
      </Center>
    </Box>
  );
};

const Dealer = ({ status, hand }) => {
  return (
    <Box d="flex" h="100%" flexDirection="column" alignItems="center">
      <Image
        borderRadius="full"
        border="solid"
        borderColor="gray.200"
        boxSize="150px"
        src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MjIwNjg0MzAz/jack-black-9542484-1-402.jpg"
        alt="Dealer"
      />
      <Text color="white">Jack Black</Text>
      {status ? (
        <Heading zIndex={1}>
          Points:{' '}
          {hand ? (hand.points > 21 ? 'Busted' : hand.points) : 0}
        </Heading>
      ) : null}
    </Box>
  );
};

const Player = ({ player, bet, hand }) => {
  return (
    <Box d="flex" flexDirection="column" h="100%" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="150px"
        border="solid"
        borderColor="gray.200"
        src={player?.image}
        alt={player?.username}
      />
      <Text color="white">{player?.username}</Text>
      <Heading>Bet: ${bet}</Heading>
      <Heading zIndex={1}>
        Points:{' '}
        {hand ? (hand.points > 21 ? 'Busted' : hand.points) : 0}
      </Heading>
    </Box>
  );
};
