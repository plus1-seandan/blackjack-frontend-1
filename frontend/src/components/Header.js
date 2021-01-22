import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Button, Stack } from '@chakra-ui/react';

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
  return (
    <Flex
      as="nav"
      align="center"
      justify="flex-end"
      wrap="wrap"
      w="100%"
      p={8}
      bg={[
        'primary.500',
        'primary.500',
        'transparent',
        'transparent',
      ]}
      color={['white', 'white', 'primary.700', 'primary.700']}
      {...props}
    >
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
          >
            Logout
          </Button>
        </MenuItems>
      </Flex>
    </Flex>
  );
};

export default Header;

// import React from 'react';
// import {Link} from 'react-router-dom';

// const Header = () => {
//   return (
//     <header>
//       <nav>
//         <h2><Link to='/'>Home</Link></h2>
//         <h2><Link to='/game'>Play</Link></h2>
//         <h2><Link to='/profile'>Profile</Link></h2>
//       </nav>
//     </header>
//   )
// }

// export default Header;
