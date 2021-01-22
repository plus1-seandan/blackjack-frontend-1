import React from 'react';
import { GridItem, Grid } from '@chakra-ui/react';
import Header from '../components/Header';
import MyInfo from '../components/MyInfo';
import Leaderboard from '../components/Leaderboard';

const HomePage = () => {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem
        rowStart={1}
        rowEnd={2}
        colStart={1}
        colEnd={13}
        bg="#68D391"
      >
        <Header />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={13}
        colStart={1}
        colEnd={3}
        bg="#FEFCBF"
      >
        <MyInfo />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={3}
        colEnd={13}
        bg="#B2F5EA"
      >
        <Leaderboard />
      </GridItem>
      <GridItem
        rowStart={12}
        rowEnd={13}
        colStart={1}
        colEnd={13}
        bg="tomato"
      />
    </Grid>
  );
};
export default HomePage;
