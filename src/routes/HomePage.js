import React from 'react';
import { GridItem, Grid, Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';
import MyInfo from '../components/MyInfo';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import HomeSideComponent from '../components/HomeSideComponent';
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
      >
        <Header />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={1}
        colEnd={3}
        bg="#8D89A6"
        mt="100px"
      >
        <MyInfo />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={3}
        colEnd={11}
        boxShadow="dark-lg"
        rounded="md"
        bg="white"
        mt="20px"
        ml="20px"
        mr="20px"
      >
        <Leaderboard />
      </GridItem>
      <GridItem
        rowStart={2}
        rowEnd={12}
        colStart={11}
        colEnd={13}
        boxShadow="dark-lg"
        rounded="md"
        bg="black"
        mt="20px"
        mr="50px"
        border="solid"
        borderColor="white"
      >
        <HomeSideComponent />
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
