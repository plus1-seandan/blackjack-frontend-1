import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Image,
  HStack,
  Center,
  Heading,
  Spacer,
} from '@chakra-ui/react';

const MenuItems = (props) => {
  const { children, isLast, to = '/', ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const Header = (props) => {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <Flex
      justify="flex-end"
      wrap="wrap"
      w="100%"
      p={3}
      bg="#1A1423"
      color={['white', 'white', 'primary.700', 'primary.700']}
      border="solid"
    >
      <Box position="relative" right="35%">
        <HStack>
          <Image
            boxSize="70px"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/poker_logo2.png"
            alt="Poker Logo"
            id="poker"
          ></Image>
          <Box>
            <Text fontSize="6xl">Blackjack</Text>
          </Box>
        </HStack>
      </Box>
      <Flex
        align={['center', 'center', 'center', 'center']}
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
      >
        <MenuItems to="/home">Home</MenuItems>
        <MenuItems to="/game">Play </MenuItems>
        <MenuItems to="/profile">Profile </MenuItems>
        <MenuItems to="/" isLast>
          <Button
            size="sm"
            rounded="md"
            color={['primary.500', 'primary.500', 'white', 'white']}
            bg="#F56565"
            onClick={handleLogout}
          >
            {localStorage.getItem('token') ? 'Logout' : 'Login'}
          </Button>
        </MenuItems>
      </Flex>
    </Flex>
  );
};

export default Header;
