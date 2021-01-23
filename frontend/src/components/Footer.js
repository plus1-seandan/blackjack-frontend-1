import {
  Text,
  Link,
  Box,
  HStack,
  Divider,
  VStack,
  Center,
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      h="100%"
      alignItems="center"
    >
      <VStack>
        <Text color="white">
          {'Created By: Sean Dan & Jonnathan Sullins'}
        </Text>
        <HStack>
          <Link
            href="https://github.com/jyxsul"
            isExternal
            color="white"
          >
            Jonnathan's Github
          </Link>
          <Center height="20px">
            <Divider orientation="vertical" />
          </Center>
          <Link
            href="https://github.com/seanysdan"
            isExternal
            color="white"
          >
            Sean's Github
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;
