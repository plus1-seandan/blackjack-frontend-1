import React from 'react';
import {
  GridItem,
  Grid,
  Center,
  Button,
  Box,
} from '@chakra-ui/react';
import Header from '../components/Header';
import MyInfo from '../components/MyInfo';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import Footer from '../components/Footer';

const HomePage = () => {
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
        rowEnd={12}
        colStart={1}
        colEnd={3}
        bg="#EACDC2"
      >
        <MyInfo />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={3}
        colEnd={13}
        boxShadow="dark-lg"
        rounded="md"
        bg="white"
        mt="20px"
        ml="50px"
        mr="50px"
      >
        <Leaderboard />
      </GridItem>
      <GridItem
        rowStart={12}
        rowEnd={13}
        colStart={1}
        colEnd={13}
        boxShadow="dark-lg"
        mt="20px"
        bg="#372549"
      >
        <Footer />
      </GridItem>
    </Grid>
  );
};
export default HomePage;
