import React, { Component } from 'react';

class ValueField extends Component {

  render() {
    return (
      <div style={this.getStyle()}></div>
    );
  }

  getStyle() {

    const { size } = this.props;
  
    return {
      width: `${size}px`,
      height: `${size}px`,
      border: '1px solid'
    }
  }
}

export default ValueField;