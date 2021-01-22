import React from 'react';
import './Chips.scss';

class Chips extends React.Component {
  render() {
    return (
      <>
        <div class="chips">
          <div
            class="pokerchip white"
            onClick={this.props.changeColor}
          ></div>
          <div
            class="pokerchip red"
            onClick={this.props.changeColor}
          ></div>
          <div
            class="pokerchip blue"
            onClick={this.props.changeColor}
          ></div>
          <div
            class="pokerchip green"
            onClick={this.props.changeColor}
          ></div>
          <div
            class="pokerchip black"
            onClick={this.props.changeColor}
          ></div>
        </div>
      </>
    );
  }
}

export default Chips;
