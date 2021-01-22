import { Box } from '@chakra-ui/react';
import PlayingCard from '../components/Card/PlayingCard';
import { makeStyles } from '@material-ui/core';

export const formatCard = ({ card }) => {
  const cardArr = card.split(' ');
  const value = cardArr[0];
  const suit = cardArr[1];
  return <PlayingCard value={value} suit={suit} />;
};

export const formatDealerCard = (card, idx) => {
  const cardArr = card.card.split(' ');
  const value = cardArr[0];
  const suit = cardArr[1];
  if (idx === 0) {
    return <FaceDownCard />;
  }
  return <PlayingCard value={value} suit={suit} />;
};

const FaceDownCard = () => {
  const classes = useStyles();
  return <Box className={classes.playingCard}></Box>;
};

const useStyles = makeStyles({
  playingCard: {
    border: '1px solid',
    'border-color': 'black',
    'border-radius': '0.5em',
    '-moz-border-radius': '0.5em',
    '-webkit-border-radius': '0.5em',
    '-khtml-border-radius': '0.5em',
    'letter-spacing': '-5px',
    'text-indent': ' -5px',
    'box-sizing': 'border-box',
    '-webkit-box-sizing': 'border-box',
    height: '200px',
    width: '150px',
    position: 'relative',
    'font-family': 'arial',
    display: 'inline-block',
    'background-image': 'linear-gradient(#89f7fe, #66a6ff)',
  },
});
