import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <p>Register</p>
        <form>
          <label>
            Username:
            <input type="text" onChange={this.handleChange}/>
          </label>
          <label>
            Password:
            <input type="text" onChange={this.handleChange}/>
          </label>
          <input type="submit" onClick={this.handleClick}/>
        </form>
      </div>

    )
  }
};

export default Register;