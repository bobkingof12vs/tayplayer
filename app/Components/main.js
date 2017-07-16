import React, { Component } from 'react';
import * as mousetrap from 'mousetrap';

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

  newFrame(){
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

  clamp(val, min, max){
    return (val < min) ? min : (val > max ? max : (val));
  }

  startMove(event, id, y, x, h, w){
    event.stopPropagation();
    event.preventDefault();
    window.addEventListener("mousemove", this.onMove);
    window.addEventListener("mouseup", this.endMove);
    let start = {};
    let newFrames = this.state.frames.map(curFrame => {
      let frame = Object.assign(curFrame);
      if(frame.id == id){
        frame.zindex = this.state.zindex;
        if(h == -1 && w == -1){
          start.x = 0;//(frame.left * window.innerWidth ) - event.clientX;
          start.y = 0;
        }
        else {
          start.x = (x == 1) ? 0 : frame.width * window.innerWidth;//(frame.left * window.innerWidth ) - event.clientX;
          start.y = (y == 1) ? 0 : frame.height * window.height;
        }

      }
      return frame;
    });
    this.setState({
      frames: newFrames,
      frameid: id,
      dir:  { y, x, h, w },
      zindex: this.state.zindex + 1,
      start
    });
  }

  onMove({clientX, clientY}){
    const { frames, start, dir, frameid } = this.state;

    let minx = 175 / window.innerWidth;
    let miny = 175 / window.innerHeight;

    let closestx = Infinity, closesty = Infinity;
    if(this.state.snap){

      let thisFrame = this.state.frames.find(f => f.id == frameid);

      frames.map(f => {

        if(f.id == frameid)
          return;

        let l = f.left * window.innerWidth;
        let t = f.top * window.innerHeight;
        let w = l + (f.width * window.innerWidth);
        let h = t + (f.height * window.innerHeight);

        if(clientY > (t - 12) && clientY < (h + 12)){
          let distx = Math.abs(l - clientX);
          if(Math.abs(closestx - clientX) >= distx)
            closestx = l;

          distx = Math.abs(w - clientX);
          if(Math.abs(closestx - clientX) >= distx)
            closestx = w;
        }

        if(clientX > (l - 12) && clientX < (w + 12)){
          let disty = Math.abs(t - clientY);
          if(Math.abs(closesty - clientY) >= disty)
            closesty = t;

          disty = Math.abs(h - clientY);
          if(Math.abs(closesty - clientY) >= disty)
            closesty = h;
        }
      });
    }

    if(Math.abs(closestx - clientX) < 12)
      clientX = closestx;
    if(Math.abs(closesty - clientY) < 12)
      clientY = closesty;

    let newFrames = frames.map(curFrame => {
      if(curFrame.id == frameid){

        let newFrame = Object.assign(curFrame);
        if(dir.h == 1)
          newFrame.height = this.clamp((clientY / window.innerHeight) - newFrame.top, miny, 1);
        if(dir.w == 1)
          newFrame.width = this.clamp((clientX / window.innerWidth) - newFrame.left, minx, 1);

        if(dir.y == 1){
          let newy = this.clamp((clientY + start.y) / window.innerHeight, 0, .98);
          if(newFrame.height + (newFrame.top - newy) > miny || dir.h == -1){
            if(dir.h == 0)
              newFrame.height += (newFrame.top - newy);
            newFrame.top = newy;
          }
        }

        if(dir.x == 1){
          let newx = this.clamp((clientX + start.x) / window.innerWidth, 0, .98);
          if(newFrame.width + (newFrame.left - newx) > minx || dir.w == -1){
            if(dir.w == 0)
              newFrame.width += (newFrame.left - newx);
            newFrame.left = newx;
          }
        }

        return newFrame
      }
      return curFrame;
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

  componentWillMount(){
    mousetrap.bind("shift+w", this.newFrame);
    mousetrap.bind("shift+q", this.autoLayout);
    mousetrap.bind("shift+s", this.setSnap);
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
