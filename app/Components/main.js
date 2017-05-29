import React, { Component } from 'react';
import { Nav } from './nav';
import { Frame } from './frame';
import { Help } from './help';
import { getParameterByName } from '../utils';

export class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      frames: [],
      frameid: null,
      mouse: null,
      dir: null,
      zindex: 1,
      divx: 1,
      divy: 1
    };

    this.defaultHeight = 318;
    this.defaultWidth = 400;

    this.newFrame = this.newFrame.bind(this);
    this.updateFrame = this.updateFrame.bind(this);
    this.closeFrame = this.closeFrame.bind(this);
    this.endMove = this.endMove.bind(this);
    this.onMove = this.onMove.bind(this);
    this.startMove = this.startMove.bind(this);
    this.autoLayout = this.autoLayout.bind(this);
    this.buildUrl = this.buildUrl.bind(this);
  }

  newFrame(callback = null){
    let rect = this.refs.main.getBoundingClientRect();
    let frames = Array.from(this.state.frames);
    frames.push({
      id: Date.now(),
      top: Math.floor((rect.height / 2) - (this.defaultHeight / 2)),
      left: Math.floor((rect.width / 2) - (this.defaultWidth / 2)),
      height: this.defaultHeight,
      width: this.defaultWidth,
      zindex: this.state.zindex,
      type: "",
      stream: ""
    });
    this.setState({frames, zindex: this.state.zindex + 1});
  }

  newQueryFrame(type, stream, zindex){
    let rect = this.refs.main.getBoundingClientRect();
    return {
      id: zindex,
      top: Math.floor((rect.height / 2) - (this.defaultHeight / 2)),
      left: Math.floor((rect.width / 2) - (this.defaultWidth / 2)),
      height: this.defaultHeight,
      width: this.defaultWidth,
      zindex: this.state.zindex,
      type: type,
      stream: stream
    };
  }

  updateFrame(id, value){
    let newFrames = this.state.frames.map(curFrame => {
      if(curFrame.id == id)
        return Object.assign({}, curFrame, value);
      return Object.assign(curFrame);
    });
    this.setState({frames: newFrames}, ()=>console.log(this.state.frames));
  }

  closeFrame(id){
    let newFrames = this.state.frames.filter(i => i.id != id);
    this.setState({frames: newFrames});
  }

  startMove(event, id, y, x, h, w){
    window.addEventListener("mousemove", this.onMove);
    window.addEventListener("mouseup", this.endMove);
    let newFrames = this.state.frames.map(curFrame => {
      let frame = Object.assign(curFrame);
      if(frame.id == id)
        frame.zindex = this.state.zindex;
      return frame;
    });
    this.setState({
      frames: newFrames,
      frameid: id,
      mouse: { x: event.clientX, y: event.clientY },
      dir:  { y, x, h, w },
      zindex: this.state.zindex + 1
    });
  }

  clamp(val, min, max){
    return (val < min) ? min : (val > max ? max : (val));
  }

  onMove({clientX, clientY}){
    const mainRect = this.refs.main.getBoundingClientRect();
    const { frames, mouse, dir, frameid, divy } = this.state;

    let dx = clientX - mouse.x;
    let dy = clientY - mouse.y;

    let newFrames = frames.map(curFrame => {
      if(curFrame.id == frameid){
        let newFrame = Object.assign(curFrame);
        newFrame.top    = this.clamp(newFrame.top    + (dir.y * dy), divy,  mainRect.height - divy);
        newFrame.left   = this.clamp(newFrame.left   + (dir.x * dx), 0,     mainRect.width  - 12);
        newFrame.height = this.clamp(newFrame.height + (dir.h * dy), 175,   mainRect.height - divy - 18);
        newFrame.width  = this.clamp(newFrame.width  + (dir.w * dx), 175,   mainRect.width);
        return newFrame
      }
      return Object.assign(curFrame);
    })
    this.setState({
      frames: newFrames,
      mouse: { x: clientX, y: clientY },
    });
  }

  endMove(){
    window.removeEventListener("mousemove", this.onMove);
    this.setState({ mouse: null, dir:  null, frameid: null });
  }

  autoLayout(){
    let count = this.state.frames.length;
    let rect = this.refs.main.getBoundingClientRect();
    let width = rect.width - 9;
    let height = rect.height - this.state.divy;

    let bestx = 1, besty = 1, bestArea = 1, area;

    for(let i = 1; i <= count; i++){
      for(let j = 1; j <= count; j++){
        if(i * j < count)
          continue;

        let splitWidth = width / i;
        let splitHeight = height / j;

        if(splitHeight > (splitWidth * (3/4)))
          area = splitWidth * (splitWidth * (3/4));
        else
          area = splitHeight * (splitHeight * (4/3));

        if((area * count) > bestArea){
          bestx = i;
          besty = j;
          bestArea = area * count;
        }
      }
    }

    let curx = -1, cury = 0;
    let newFrames = this.state.frames.map((_frame, index) => {
      let frame = Object.assign({}, _frame);
      curx++;
      if(curx >= bestx){
        cury++;
        curx = 0;
      }

      frame.top = (cury * Math.floor(height / besty)) + this.state.divy;
      frame.height = Math.floor(height / besty);
      frame.left = curx * Math.floor(width / bestx);
      frame.width = ((index == this.state.frames.length - 1) ?  (bestx - curx) : 1 ) * Math.floor(width / bestx);

      return frame;
    })

    this.setState({frames: newFrames});
  }

  buildUrl(){
    let streams={ twitch:[], chat:[], youtube:[] };
    this.state.frames.map(f => f.stream !== "" && streams[f.type].push(f.stream));

    let url = window.location.origin+window.location.pathname+"?";
    if(streams.twitch.length > 0)
      url += "twitch="+streams.twitch.join(',')+"&"
    if(streams.chat.length > 0)
      url += "chat="+streams.chat.join(',')+"&"
    if(streams.youtube.length > 0)
      url += "youtube="+streams.youtube.join(',')+"&"
    return url;
  }

  componentDidMount(){

    let twitch = getParameterByName("twitch");
    let chat = getParameterByName("chat");
    let youtube = getParameterByName("youtube");

    let frames = [], zindex = 1;
    twitch && twitch.split(',').map(t => frames.push(this.newQueryFrame("twitch", t, zindex++)));
    chat && chat.split(',').map(t => frames.push(this.newQueryFrame("chat",   t, zindex++)));
    youtube && youtube.split(',').map(t => frames.push(this.newQueryFrame("youtube", t, zindex++)));
    this.setState({frames, zindex});

    let screenupdate = (callback = ()=>{}) => {
      let rect = this.refs.main.getBoundingClientRect();
      let divx = rect.width / Math.floor(rect.width / 25);
      let divy = rect.width / Math.floor(rect.width / 25);
      this.setState({divx, divy}, callback);
    }
    screenupdate(this.autoLayout);
    window.addEventListener("onresize", screenupdate);
  }

  render(){
    return <div id="main" ref="main" onMouseUp={this.endMove}>
      <Help fade={this.state.frames.length != 0}/>
      <Nav
        style={{height: `${this.state.divy}px`, lineHeight: `${this.state.divy}px`}}
        newWindow={this.newFrame}
        autoLayout={this.autoLayout}
        buildUrl={this.buildUrl}
      />
      {this.state.frames.map(frame => {
        return <Frame
            key={frame.id}
            {...frame}
            divx={this.state.divx}
            divy={this.state.divy}
            updateFrame={this.updateFrame}
            closeFrame={this.closeFrame}
            startMove={this.startMove}
            mainRect={this.refs.main.getBoundingClientRect()}
          />
      })}
      {
        this.state.dir !== null &&
        <div className="blocker" ></div>
      }
    </div>;
  }
}
