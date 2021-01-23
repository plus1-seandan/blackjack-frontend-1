import { Box, Button } from '@chakra-ui/react';
import {
  displayBetButton,
  displayDealButton,
  displayDoubleButton,
  displayHitButton,
  displayNewGameButton,
  displayStandButton,
} from '../util/game';

function GameButtons(props) {
  console.log(props);
  return (
    <Box>
      <Button
        bg="#b20000"
        color="white"
        size="sm"
        m="3"
        onClick={props.newGame}
        isDisabled={displayNewGameButton(props.actions, props.busted)}
      >
        New Game
      </Button>
      <Button
        bg="#b20000"
        color="white"
        size="sm"
        m="3"
        onClick={props.submitBet}
        isDisabled={displayBetButton(props.actions)}
      >
        Bet
      </Button>
      <Button
        bg="#b20000"
        color="white"
        size="sm"
        m="3"
        onClick={props.dealCards}
        isDisabled={displayDealButton(props.actions)}
      >
        Deal
      </Button>
      <Button
        bg="#b20000"
        color="white"
        size="sm"
        m="3"
        onClick={props.hit}
        isDisabled={displayHitButton(props.actions, props.busted)}
      >
        Hit
      </Button>
      <Button
        bg="#b20000"
        color="white"
        size="sm"
        m="3"
        onClick={props.doubleDown}
        isDisabled={displayDoubleButton(props.actions)}
      >
        Double
      </Button>
      <Button
        bg="#b20000"
        color="white"
        size="sm"
        m="3"
        onClick={props.stand}
        isDisabled={displayStandButton(props.actions, props.busted)}
      >
        Stand
      </Button>
    </Box>
  );
}

export default GameButtons;
