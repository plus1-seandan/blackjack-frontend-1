import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
// import history from '../history';
import {withRouter} from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, Text } from '@chakra-ui/react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
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
      <Box>
        <form onSubmit={this.handleClick}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={(event) =>
                this.setState({ email: event.target.value })
              }/>
          </FormControl>
            <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"  onChange={(event) =>
                this.setState({ password: event.target.value })
              }/>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
        <Text>
          <Link to="/register">Don't have an acccount?</Link>
        </Text>
      </Box>
    );
  }
}

export default withRouter(Login);
