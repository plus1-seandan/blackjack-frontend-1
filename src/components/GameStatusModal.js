import {
  Button,
  Center,
  Heading,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Text,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

function GameStatusModal({
  isOpen,
  onClose,
  payout,
  newGame,
  status,
}) {
  const displayMessage = () => {
    if (status === 'win') {
      return (
        <Box>
          <Heading>YOU WIN</Heading>
          <Center pt="50px">
            <Text fontSize="4xl">You Win: $ {payout}</Text>
          </Center>
        </Box>
      );
    } else if (status === 'draw') {
      return (
        <Box>
          <Heading>PUSH</Heading>
          <Center pt="50px">
            <Text fontSize="4xl">You Win: $ {payout}</Text>
          </Center>
        </Box>
      );
    } else {
      return (
        <Box>
          <Heading>YOU LOSE</Heading>
          <Center pt="50px">
            <Text fontSize="4xl">You Lost: $ {payout}</Text>
          </Center>
        </Box>
      );
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{displayMessage()} </ModalBody>
          <ModalFooter pt="50px">
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={newGame}
              ml="20px"
            >
              New Game
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GameStatusModal;
