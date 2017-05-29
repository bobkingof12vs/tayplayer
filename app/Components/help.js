import React, { Component } from 'react';

export const Help = (props) => {
  return <div style={{opacity: props.fade ? "" : "1"}} className="help_text">
    <pre className="description">
      <span style={{userSelect: "text"}}>
        the twitch and youtube player
        <br />
        <br />currently in beta, so please be kind
        <br />issues should go to the <a href="https://github.com/bobkingof12vs/tayplayer">github page</a>
      </span>
    </pre>
    <pre style={{margin: 0}}>
      <br /><br /><br /><br />
      <span style={{userSelect: "text"}}>
        <strong>directions:</strong>
        <br />1. click the "new window" button in the top left
        <br />2. pick your stream provider
        <br />3. determine your stream (the underlined parts in the examples below)
        <br />    <strong>- twitch stream/chat:</strong>
        <br />        www.twitch.tv/<span style={{color: "#aaa", textDecoration: "underline"}}>basetradetv</span>
        <br />    <strong>- twitch video:</strong>
        <br />        www.twitch.tv/videos/<span style={{color: "#aaa", textDecoration: "underline"}}>147466582</span>
        <br />    <strong>- youtube stream/video/chat:</strong>
        <br />        www.youtube.com/watch?v=<span style={{color: "#aaa", textDecoration: "underline"}}>4qqRZnO5z3g</span>
        <br />4. hit "launch stream"
        <br />5. move and resize the stream
        <br />   - move by dragging the top bar
        <br />   - resize by grabbing the edges
        <br />   - or simply hit the "quick fit" button up top
        <br />6. share what you{"'"}re watching with the "get link" button
      </span>
    </pre>
  </div>
}

//ave maria, gratia plena, dominus tecum
//benedicta tu in mulieribus, et benedictus fructus ventris tui, iesus
//sancta maria, mater dei, ora pro nobis peccatoribus, nunc, et in hora mortis nostrae
