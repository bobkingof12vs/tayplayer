import React, { Component } from 'react';

export class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      link: ""
    };
  }

  link(){
    this.setState({link: this.props.buildUrl()}, ()=>this.refs.link.select());
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
        onClick={()=>this.link()}
      >get link</span>
      <input type="text" ref="link" className="share_link" value={this.state.link} />
    </div>;
  }
}
