import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link,
  HStack,
  Text,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import pokerChip from '@iconify-icons/mdi/poker-chip';

const GameChips = ({ handleBet }) => {
  return (
    <Box d="flex" justifyContent="center">
      <HStack
        w="700px"
        border="solid"
        p="20px"
        bg="#1C4532"
        justifyContent="center"
      >
        <Box>
          <Box
            _hover={{ bg: '#CBD5E0' }}
            borderRadius="50%"
            onClick={() => {
              handleBet(1);
            }}
          >
            <Icon icon={pokerChip} color="white" width="100px" />
          </Box>
          <Heading>$1</Heading>
        </Box>
        <Box>
          <Box
            _hover={{ bg: '#CBD5E0' }}
            borderRadius="50%"
            onClick={() => {
              handleBet(5);
            }}
          >
            <Icon icon={pokerChip} color="red" width="100px" />
          </Box>
          <Heading>$5</Heading>
        </Box>
        <Box>
          <Box
            _hover={{ bg: '#CBD5E0' }}
            borderRadius="50%"
            onClick={() => {
              handleBet(10);
            }}
          >
            <Icon icon={pokerChip} color="blue" width="100px" />
          </Box>
          <Heading>$10</Heading>
        </Box>
        <Box>
          <Box
            _hover={{ bg: '#CBD5E0' }}
            borderRadius="50%"
            onClick={() => {
              handleBet(25);
            }}
          >
            <Icon icon={pokerChip} color="green" width="100px" />
          </Box>
          <Heading>$25</Heading>
        </Box>
        <Box>
          <Box
            _hover={{ bg: '#CBD5E0' }}
            borderRadius="50%"
            onClick={() => {
              handleBet(100);
            }}
          >
            <Icon icon={pokerChip} color="black" width="100px" />
          </Box>
          <Heading>$100</Heading>
        </Box>
      </HStack>
    </Box>
  );
};

export default GameChips;
