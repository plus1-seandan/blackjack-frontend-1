import { Flex } from '@chakra-ui/react';
import { Box } from '@material-ui/core';

export default function Wrapper(props) {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      bgGradient="linear(to-t, green.200, pink.500)"
    >
      {props.children}
    </Flex>
  );
}
