import React, { Component } from 'react';

export class Frame extends Component {
  constructor(props){
    super(props);
    this.state = {
      changingStreams: props.stream === ""
    };
    this.handleLaunchClick = this.handleLaunchClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.updateStream = this.updateStream.bind(this);
  }

  getSrc(){
    if(this.props.type == "twitch")
      return `https://player.twitch.tv/?channel=${this.props.stream}&muted=true&autoplay=true`;
    if(this.props.type == "twitchChat")
      return `https://www.twitch.tv/${this.props.stream}/chat`;
    else if(this.props.type == "twitchVideo")
      return `https://player.twitch.tv/?video=${this.props.stream}`;
    else if(this.props.type == "youtube")
      return `https://www.youtube.com/embed/${this.props.stream}?autoplay=1&origin=${window.location.host}`
    else if(this.props.type == "youtubeChat")
      return `https://www.youtube.com/live_chat?v=${this.props.stream}&embed_domain=${window.location.host}`
    else
      return this.props.stream;
  }

  handleLaunchClick(event, changingStreams){
    event.preventDefault();
    event.stopPropagation();
    this.setState({changingStreams, src: this.getSrc()});
  }

  handleCloseClick(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.closeFrame(this.props.id)
  }

  updateStream({target}){
    let stream = target.value;
    stream = stream.replace(/\W/g, '');
    this.props.updateFrame(this.props.id, {stream});
  }

  componentDidMount(){
    if(!this.state.changingStreams)
      this.setState({src: this.getSrc()});
  }

  render(){

    let { id, src, top, left, width, height,  zindex, mainRect, divx, divy, updateFrame } = this.props;

    let style={
      top:    (Math.round(top    / divy) * divy) + "px",
      left:   (Math.round(left   / divx) * divx) + "px",
      height: (Math.round(height / divy) * divy) + "px",
      width:  (Math.round(width  / divx) * divx) + "px",
      zIndex: zindex
    };

    return <div className="frame" style={style}>

      <div className="frame_top" onMouseDown={(e)=>this.props.startMove(e, id, 1, 1, 0, 0)}>
        {
          !this.state.changingStreams &&
          <div className="frame_change" onMouseDown={e=>e.stopPropagation()} onClick={(e)=>this.handleLaunchClick(e, true)}>change</div>
        }
        <div className="frame_close" onMouseDown={e=>e.stopPropagation()} onClick={this.handleCloseClick} >close</div>
      </div>

      {
        this.state.changingStreams &&
        <div className="change_stream">
          <input className="stream_input" placeholder="stream name" value={this.props.stream} onChange={this.updateStream}/>
          <br />
          <select
            onChange={({target})=>{console.log(target.value); updateFrame(id, {type: target.value})}}
            className="stream_select"
          >
            <optgroup label="watch">
              <option value="twitch"> twitch stream </option>
              {/*}<option value="twitchVideo" label="twitch vod (beta)" />*/}
              <option value="youtube"> youtube video/stream </option>
            </optgroup>
            <optgroup label="chat">
              <option value="twitchChat"> twitch chat </option>
              <option value="youtubeChat"> youtube chat </option>
            </optgroup>
          </select>
          <br />
          <div className="run_change" onClick={(e)=>this.handleLaunchClick(e, false)}>
            launch stream
          </div>
        </div>
      }
      {
        !this.state.changingStreams && this.state.src &&
        <iframe
          className="video_frame"
          style={{border: "none"}}
          src={this.state.src}
          height={(Math.round(height / divy) * divy) - 18}
          width={(Math.round(width / divx) * divx)}
          frameBorder="0"
          scrolling="no"
          allowFullScreen="true"
        />
      }

      <div className="frame_left"         onMouseDown={(e)=>this.props.startMove(e, id, 0, 1,  0, -1)}/>
      <div className="frame_height"       onMouseDown={(e)=>this.props.startMove(e, id, 0, 0,  1,  0)}/>
      <div className="frame_width"        onMouseDown={(e)=>this.props.startMove(e, id, 0, 0,  0,  1)}/>
      <div className="frame_h_and_w"      onMouseDown={(e)=>this.props.startMove(e, id, 0, 0,  1,  1)}/>
      <div className="frame_w_and_h"      onMouseDown={(e)=>this.props.startMove(e, id, 0, 1,  1, -1)}/>
      <div className="frame_h_and_w_top"  onMouseDown={(e)=>this.props.startMove(e, id, 1, 0, -1,  1)}/>
      <div className="frame_w_and_h_top"  onMouseDown={(e)=>this.props.startMove(e, id, 1, 1, -1, -1)}/>
    </div>;
  }
}
