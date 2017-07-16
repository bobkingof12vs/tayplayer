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
      snap: true
    };

    this.defaultHeight = 318 / window.innerHeight;
    this.defaultWidth = 400 / window.innerWidth;

    this.newFrame = this.newFrame.bind(this);
    this.updateFrame = this.updateFrame.bind(this);
    this.closeFrame = this.closeFrame.bind(this);
    this.endMove = this.endMove.bind(this);
    this.onMove = this.onMove.bind(this);
    this.startMove = this.startMove.bind(this);
    this.autoLayout = this.autoLayout.bind(this);
    this.buildUrl = this.buildUrl.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.setSnap = this.setSnap.bind(this);
  }

  setSnap(){
    this.setState({snap: !this.state.snap});
  }

  newFrame(callback = null){
    let frames = Array.from(this.state.frames);
    frames.push({
      id: Date.now(),
      top: .25 + (.25 * Math.random()),
      left: .25 + (.25 * Math.random()),
      height: this.defaultHeight,
      width: this.defaultWidth,
      zindex: this.state.zindex,
      type: "twitch",
      stream: ""
    });
    this.setState({frames, zindex: this.state.zindex + 1});
  }

  newQueryFrame(type, stream, zindex){
    return {
      id: zindex,
      top: 0,
      left: 0,
      height: this.defaultHeight,
      width: this.defaultWidth,
      zindex: zindex,
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
    this.setState({frames: newFrames}, this.setUrl);
  }

  closeFrame(id){
    let newFrames = this.state.frames.filter(i => i.id != id);
    this.setState({frames: newFrames}, this.setUrl);
  }

  startMove(event, id, y, x, h, w){
    event.stopPropagation();
    event.preventDefault();
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
    const { frames, mouse, dir, frameid } = this.state;

    let dx = (clientX - mouse.x) / window.innerWidth;
    let dy = (clientY - mouse.y) / window.innerHeight;

    let minx = 175 / window.innerWidth;
    let miny = 175 / window.innerHeight;

    let newFrames = frames.map(curFrame => {
      if(curFrame.id == frameid){
        let newFrame = Object.assign(curFrame);
        newFrame.height = this.clamp(newFrame.height + (dir.h * dy), miny, 1);
        newFrame.width  = this.clamp(newFrame.width  + (dir.w * dx), minx, 1);
        newFrame.top    = this.clamp(newFrame.top    + (dir.y * dy), 0,    .98);
        newFrame.left   = this.clamp(newFrame.left   + (dir.x * dx), .03 - newFrame.width , .98);
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

    let chats = this.state.frames.filter(f => f.type == "twitchChat" || f.type == "youtubeChat");
    let streams = this.state.frames.filter(f => f.type == "twitch" || f.type == "youtube");

    let count = streams.length;
    let width = window.innerWidth - (chats.length > 0 ? 280 : 0);
    let height = window.innerHeight;

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

    let curx = -1, cury = 0, chaty = 0;

    let newWidth = (width / bestx) / window.innerWidth;
    let newHeight = (height / besty) / window.innerHeight;

    let newFrames = this.state.frames.map((_frame, index) => {

      let frame = Object.assign({}, _frame);

      if(frame.type == "twitch" || frame.type == "twitchVideo" || frame.type == "youtube"){
        curx++;
        if(curx >= bestx){
          cury++;
          curx = 0;
        }

        frame.top = cury * newHeight;
        frame.height = newHeight;
        frame.left = curx * newWidth;
        frame.width = newWidth;
      }
      else {
        frame.top = chaty++ / chats.length;
        frame.height = 1 / chats.length;
        frame.left = (window.innerWidth - 280) / window.innerWidth;
        frame.width = 280 / window.innerWidth;
      }
      return frame;
    });

    this.setState({frames: newFrames});
  }

  buildUrl(){
    let streams={ twitch:[], twitchChat:[], twitchVideo:[], youtube:[], youtubeChat:[] };
    this.state.frames.map(f => f.stream !== "" && streams[f.type].push(f.stream));

    let url = window.location.origin+window.location.pathname+"?";
    if(streams.twitch.length > 0)
      url += "twitch="+streams.twitch.join(',')+"&";
    if(streams.twitchChat.length > 0)
      url += "tchat="+streams.twitchChat.join(',')+"&";
    //if(streams.twitchVideo.length > 0)
      //url += "tvideo="+streams.twitchVideo.join(',')+"&";
    if(streams.youtube.length > 0)
      url += "youtube="+streams.youtube.join(',')+"&";
    if(streams.youtubeChat.length > 0)
      url += "ychat="+streams.youtubeChat.join(',');
    return url;
  }

  setUrl(){
    window.history.replaceState("","", this.buildUrl());
  }

  componentDidMount(){
    let twitch = getParameterByName("twitch");
    let tchat = getParameterByName("tchat");
    let tvideo = getParameterByName("tvideo");
    let youtube = getParameterByName("youtube");
    let ychat = getParameterByName("ychat");

    let frames = [], zindex = 1;
    twitch  && twitch .split(',').map(t => frames.push(this.newQueryFrame("twitch",      t, zindex++)));
    tchat   && tchat  .split(',').map(t => frames.push(this.newQueryFrame("twitchChat",  t, zindex++)));
    tvideo  && tvideo .split(',').map(t => frames.push(this.newQueryFrame("twitchVideo", t, zindex++)));
    youtube && youtube.split(',').map(t => frames.push(this.newQueryFrame("youtube",     t, zindex++)));
    ychat   && ychat  .split(',').map(t => frames.push(this.newQueryFrame("youtubeChat", t, zindex++)));
    this.setState({frames, zindex});

    this.autoLayout();
  }

  render(){
    return <div id="main" onMouseUp={this.endMove}>
      <Help fade={this.state.frames.length != 0}/>
      <Nav
        {...this.state}
        newWindow={this.newFrame}
        autoLayout={this.autoLayout}
        setSnap={this.setSnap}
      />
      {this.state.frames.map(frame => {
        return <Frame
            key={frame.id}
            {...frame}
            updateFrame={this.updateFrame}
            closeFrame={this.closeFrame}
            startMove={this.startMove}
          />
      })}
      {
        this.state.dir !== null &&
        <div className="blocker" ></div>
      }
    </div>;
  }
}
