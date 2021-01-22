import PlayingCard from '../components/Card/PlayingCard';

export const formatCard = (card) => {
  console.log({ card });
  const cardArr = card.card.split(' ');
  const value = cardArr[0];
  const suit = cardArr[1];
  return <PlayingCard value={value} suit={suit} />;
};
