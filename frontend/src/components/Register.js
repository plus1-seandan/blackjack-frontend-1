import React from 'react';
import axios from 'axios';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Stack,
  Checkbox,
  Flex,
  useColorMode,
  IconButton,
  Link,
} from '@chakra-ui/react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      cash: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:8081/register?username=${this.state.username}&email=${this.state.email}&password=${this.state.password}&cash=${this.state.cash}`,
    );

    this.setState({
      email: '',
      username: '',
      password: '',
    });

    this.props.history.push('/');
  }

  render() {
    return (
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={10}
        textAlign="center"
        boxShadow="lg"
        bg="white"
      >
        <Box p={4}>
          <Box textAlign="center">
            <Heading>Register</Heading>
          </Box>
          <Box my={8} textAlign="left">
            <form onSubmit={this.handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={(event) =>
                    this.setState({ username: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
              </FormControl>
              <Box mt="20px">
                <Button type="submit">Submit</Button>
              </Box>
              <Stack isInline justifyContent="space-between" mt={4}>
                <Box>
                  <Link as={RouterLink} to="/">
                    Already have an account? Login!
                  </Link>
                </Box>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default withRouter(Register);
