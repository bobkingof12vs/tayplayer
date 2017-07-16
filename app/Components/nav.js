import React, { Component } from 'react';

export class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand: true
    }
  }

  render(){
    return <div style={this.props.style} className="nav_bar">
      {
        this.state.expand &&
        <div>

          <div
            className="nav_item"
            onClick={this.props.newWindow}
          >
            new window
          </div>

          <div
            className="nav_item"
            onClick={this.props.autoLayout}
          >
            {this.state.expand ? "quick fit" : "q"}
          </div>

          <div
            className="nav_item"
            style={{width: "133px"}}
            onClick={this.props.setSnap}
          >
            border snap: {this.props.snap ? "on" : "off"}
          </div>
        </div>
      }
      <div
        className="nav_item"
        onClick={()=>this.setState({expand: !this.state.expand})}
      >
        {this.state.expand ? "hide menu" : "+"}
      </div>
    </div>;
  }
}
