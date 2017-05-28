import React, { Component } from 'react';
import { s } from '../styles';

export class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return <div className="nav_bar">
      <span
        className="nav_item"
        onClick={this.props.newWindow}
      > new window </span>
    </div>;
  }
}
