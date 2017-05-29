import React, { Component } from 'react';

export class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return <div style={this.props.style} className="nav_bar">
      <span
        className="nav_item"
        onClick={this.props.newWindow}
      >new window</span>
      <span
        className="nav_item"
        onClick={this.props.autoLayout}
      >quick fit</span>
      <span
        className="nav_item"
        onClick={this.props.autoLayout}
      >get link</span>
    </div>;
  }
}
