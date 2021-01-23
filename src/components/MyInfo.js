import { Box, Button, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { getMe, getPlayerInfo } from '../util/user';
import './Chips/Chips.scss';

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: null,
      totalPayout: 0,
      win: 0,
      push: 0,
      loss: 0,
    };
  }

  async componentDidMount() {
    const me = await getMe();
    const myInfo = await getPlayerInfo();
    this.setState({ me: me });
    this.setMyInfoState(myInfo);
  }
  setMyInfoState(infos) {
    this.setState({ totalPayout: infos[0]?.total_payout });
    infos.map((info) => {
      if (info.status === 'win') {
        this.setState({
          win: info.status_count,
        });
      } else if (info.status === 'lose') {
        this.setState({
          loss: info.status_count,
        });
      } else {
        this.setState({
          push: info.status_count,
        });
      }
    });
  }

  render() {
    return (
      <Box d="flex" flexDirection="column" alignItems="flex-start">
        <Text>{this.state.me?.username}</Text>
        <Text>Wins {this.state.win}</Text>
        <Text>Push {this.state.push}</Text>
        <Text>Losses {this.state.loss}</Text>
        <Text>Payout {this.state.totalPayout}</Text>
        <Box alignSelf="center" mt="100px">
          <div class="pokerchip blue buyIn"></div>
        </Box>
        <Box alignSelf="center" mt="100px">
          <Link as={RouterLink} to="/game">
            <div class="pokerchip red play"></div>
          </Link>
        </Box>
      </Box>
    );
  }
}
export default MyInfo;
