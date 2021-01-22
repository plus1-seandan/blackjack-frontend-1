import React from 'react';

import Header from '../components/Header.jsx';
import Game from '../components/Game.jsx';
import { Box } from '@chakra-ui/react';

function GamePage() {
  return (
    <Box>
      <Header />
      <Game />
    </Box>
  );
}

export default GamePage;
