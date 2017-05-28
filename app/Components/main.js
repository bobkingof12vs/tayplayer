import React, { Component } from 'react';
import { s } from '../styles';
import { Nav } from './nav';

export class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      frames: []
    };

    this.defaultHeight = 300;
    this.defaultWidth = 400;

    this.newWindow = this.newWindow.bind(this);
  }

  newFrame(){
    let rect = this.refs.main.getBoundingClientRect();
    let frames = Array.from(this.state.frames);
    frames.push({
      id: Date.now(),
      src: null,
      top: Math.floor((rect.height / 2) - (this.defaultHeight / 2)),
      left: Math.floor((rect.width / 2) - (this.defaultWidth / 2)),
      height: this.defaultHeight,
      width: this.defaultWidth
    });
    this.setState({frames}, ()=>console.log(this.state.frames));
  }

  updateFrame(newFrame){
    let newFrames = this.state.frames.map(curFrame => {
      if(curFrame.id == newFrame.id)
        return Object.assign(newFrame);
      return Object.assign(curFrame);
    })
    this.setState({frames: newFrames});
  }

  render(){
    return <div id="main" ref="main">
      <Nav newWindow={this.newWindow} />

    </div>;
  }
}
