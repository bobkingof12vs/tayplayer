import React, { Component } from 'react';

export class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand: true
    }
    this.setExpand = this.setExpand.bind(this);
  }

  setExpand() {
    this.setState({expand: !this.state.expand});
  }
  render(){
    return <div style={this.props.style} className="nav_bar">
      {
        this.state.expand &&
        <div>
          <div>
            <span
              className="nav_item"
              onClick={this.props.newWindow}
            >
              new window
            </span>
            <span className={"shortcut"}> W </span>
          </div>

          <div>
            <span
              className="nav_item"
              onClick={this.props.autoLayout}
            >
              {this.state.expand ? "quick fit" : "q"}
            </span>
            <span className={"shortcut"}> Q </span>
          </div>

          <div>
            <span
              className="nav_item"
              style={{width: "133px"}}
              onClick={this.props.setSnap}
            >
              snapping: {this.props.snap ? "on" : "off"}
            </span>
            <span className={"shortcut"}> S </span>
          </div>
        </div>
      }
      {
        this.state.expand
          ? <div className="nav_item" onClick={this.setExpand}> hide menu</div>
          : <div className="nav_item" style={{width: "auto"}} onClick={this.setExpand}> + </div>
      }
    </div>;
  }
}
