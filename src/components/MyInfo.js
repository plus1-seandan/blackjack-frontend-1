import { Box, Text, Image, Center, VStack } from '@chakra-ui/react';
import React from 'react';
import { getMe, getPlayerInfo } from '../util/user';
import './Chips/Chips.scss';
import rank from '../images/laurel-crown.png';

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
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="black"
        w="100%"
      >
        <Center>
          <VStack>
            <Text color="white" fontSize="xl" mt="20px">
              {this.state.me?.username}
            </Text>
            <Image
              boxSize="150px"
              border="solid"
              borderColor="white"
              borderRadius="full"
              src={this.state.me?.image}
              alt="No image available"
            />
          </VStack>
        </Center>
        <Box p="6">
          <Box d="flex" flexDirection="column">
            <Text color="white">Rank</Text>
            <Image src={rank} boxSize="50px" />
            <Box
              h="100%"
              color="white"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              <Text color="white" fontSize="xl">
                Payout: ${this.state.totalPayout}
              </Text>
              <Text color="white" fontSize="xl">
                Wins: {this.state.win ? this.state.win : 0}
              </Text>
              <Text color="white" fontSize="xl">
                Push: {this.state.push ? this.state.push : 0}
              </Text>
              <Text color="white" fontSize="xl">
                Loss: {this.state.loss ? this.state.loss : 0}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default MyInfo;
