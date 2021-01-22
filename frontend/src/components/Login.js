import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import axios from 'axios';
// import history from '../history';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Link,
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
} from '@chakra-ui/react';
import Wrapper from './Wrapper';

const VARIANT_COLOR = 'teal';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    //push to server
    console.log({
      email: this.state.email,
      password: this.state.password,
    });
    const response = await axios.post(
      `http://localhost:8081/login?email=${this.state.email}&password=${this.state.password}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log({ token: response.data.token });
    localStorage.setItem('token', response.data.token);
    this.props.history.push('/game');
    //reset state
    this.setState({
      email: '',
      password: '',
    });
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
            <Heading>Login</Heading>
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
                  <Link as={RouterLink} to="/register">
                    Don't have an acccount?
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

export default withRouter(Login);
