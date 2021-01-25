import React from 'react';

import Header from '../components/Header.js';
import Game from '../components/Game.js';
import { Grid, GridItem } from '@chakra-ui/react';

function GamePage() {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
      bg="#8D89A6"
    >
      <GridItem
        rowStart={1}
        rowEnd={2}
        colStart={1}
        colEnd={13}
        boxShadow="dark-lg"
        rounded="md"
        bg="white"
      >
        <Header />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={13}
        colStart={1}
        colEnd={13}
        bg="#EACDC2"
        border="solid"
      >
        <Game />
      </GridItem>
    </Grid>
  );
}

export default GamePage;
