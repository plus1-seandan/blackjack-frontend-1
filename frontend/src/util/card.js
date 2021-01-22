import { Box } from '@chakra-ui/react';
import PlayingCard from '../components/Card/PlayingCard';

export const formatCard = (card) => {
  const cardArr = card.card.split(' ');
  const value = cardArr[0];
  const suit = cardArr[1];
  return <PlayingCard value={value} suit={suit} />;
};

export const formatDealerCard = (card, idx) => {
  if (idx === 0) {
    return (
      <Box w="100px" h="200px" bg="#9F7AEA">
        FACE DOWN CARD
      </Box>
    );
  }
  const cardArr = card.card.split(' ');
  const value = cardArr[0];
  const suit = cardArr[1];
  return <PlayingCard value={value} suit={suit} />;
};
