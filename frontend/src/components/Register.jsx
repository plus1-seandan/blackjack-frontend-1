import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      cash: 100
    };
    this.handleClick = this.handleClick.bind(this);
  }
//username
//email
//cash
//password

  async handleClick(event) {
    event.preventDefault();
    const response = await axios.post(`http://localhost:8081/register?username=${this.state.username}&email=${this.state.email}&password=${this.state.password}&cash=${this.state.cash}`);

    this.setState({
      email: '',
      username: '',
      password: ''
    })

    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Email:
            <input type="text" onChange={(event) =>
                this.setState({ email: event.target.value })}/>
          </label>
          <label>
            Username:
            <input type="text" onChange={(event) =>
                this.setState({ username: event.target.value })}/>
          </label>
          <label>
            Password:
            <input type="password" onChange={(event) =>
                this.setState({ password: event.target.value })}/>
          </label>
          <input type="submit" onClick={this.handleClick}/>
        </form>
      </div>
    )
  }
};

export default withRouter(Register);