import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // send details to backend
    console.log(this.state.username)
    console.log(this.state.password)
    this.setState({
      username: '',
      password: ''
    })
    console.log(this.state.username)
    console.log(this.state.password)
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <form>
          <label>
            Username:
            <input type="text" onChange={(event, newValue) => this.setState({username: newValue})}/>
          </label>
          <label>
            Password:
            <input type="text" onChange={(event, newValue) => this.setState({password: newValue})}/>
          </label>
          <input type="submit" onClick={this.handleClick}/>
        </form>
      </div>

    )
  }
}

export default Login;