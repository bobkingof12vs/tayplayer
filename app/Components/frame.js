import React, { Component } from 'react';

export class Frame extends Component {
  constructor(props){
    super(props);
    this.state = {
      changingStreams: true,
      type: "twitchStream",
      stream: ""
    };

    this.handleLaunchClick = this.handleLaunchClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  startPlayer(){
    const { id, src, top, left, width, height } = this.props;
    if(player == "twitch")
      var options = {
        width: width,
        height: height - 18,
        channel: "starcraft"
      };
      let player = new Twitch.Player(`frame${id}`, options);
      player.setVolume(0.0);
  }

  handleLaunchClick(event, changingStreams){
    event.preventDefault();
    event.stopPropagation();
    this.setState({changingStreams});
  }

  handleCloseClick(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.closeFrame(this.props.id)
  }

  render(){

    const { id, src, top, left, width, height } = this.props;

    let style={
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`
    };

    return <div className="frame" style={style}>

      <div className="frame_top">
        {
          !this.state.changingStreams &&
          <div className="frame_change" onClick={(e)=>this.handleLaunchClick(e, true)}>change stream</div>
        }
        <div className="frame_close" onClick={this.handleCloseClick} >close frame</div>
      </div>

      {
        this.state.changingStreams &&
        <div className="change_stream">
          <input className="stream_input" placeholder="stream name" value={this.state.stream} onChange={({target})=>this.setState({stream: target.value})}/>
          <br />
          <label>
            <input type="radio" checked={this.state.type=="twitchStream"} onChange={()=>this.setState({type: "twitchStream"})} />
            twitch stream
          </label>
          <br />
          <label>
            <input type="radio" checked={this.state.type=="twitchChat"} onChange={()=>this.setState({type: "twitchChat"})} />
            twitch chat
          </label>
          <br />
          <label>
            <input type="radio" checked={this.state.type=="youtube"} onChange={()=>this.setState({type:"youtube"})} />
            youtube
          </label>
          <br />
          <div className="run_change" onClick={(e)=>this.handleLaunchClick(e, false)}>
            launch stream
          </div>
        </div>
      }
      {
        !this.state.changingStreams &&
        <div id={`frame${id}`} className="video_frame">{this.state.stream}</div>
      }

      <div className="frame_left"   />
      <div className="frame_height" />
      <div className="frame_width"  />
    </div>;
  }
}
