import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
// import history from '../history';
import {withRouter} from 'react-router-dom';

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
      <div>
        <p>Login</p>
        <form>
          <label>
            Email:
            <input
              type="text"
              onChange={(event) =>
                this.setState({ email: event.target.value })
              }
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </label>
          <button type="submit" onClick={this.handleClick}>
            Submit
          </button>
        </form>
        <h3>
          <Link to="/register">Don't have an acccount?</Link>
        </h3>
      </div>
    );
  }
}

export default withRouter(Login);
