import { UnorderedList, ListItem, Box, Text } from '@chakra-ui/react';

const HomeSideComponent = () => {
  return (
    <Box color="white" p="20px">
      <Text>
        <b>This app was creating using the following stack: </b>
      </Text>
      <Text mt="20px">Frontend</Text>
      <UnorderedList>
        <ListItem>React</ListItem>
        <ListItem>Chakra UI</ListItem>
      </UnorderedList>
      <Text mt="20px">Backend</Text>
      <UnorderedList>
        <ListItem>Node.js</ListItem>
        <ListItem>Express</ListItem>
        <ListItem>Sequelize</ListItem>
        <ListItem>Redis</ListItem>
        <ListItem>Postgres</ListItem>
      </UnorderedList>
      <Text mt="20px">Deployed Using: </Text>
      <UnorderedList>
        <ListItem>AWS</ListItem>
        <ListItem>Docker</ListItem>
        <ListItem>Surge</ListItem>
      </UnorderedList>
    </Box>
  );
};

export default HomeSideComponent;
