webpackJsonp([1],{

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(73);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(399);

var _main = __webpack_require__(199);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_main.Main, null), document.getElementById('app'));

//known issues:
//window resizing isn't handled verywell
//quick fit causes spaces (probably due to rounding), doesn't use whole window, can make windows smaller than mins

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(73);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Frame = exports.Frame = function (_Component) {
  _inherits(Frame, _Component);

  function Frame(props) {
    _classCallCheck(this, Frame);

    var _this = _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).call(this, props));

    _this.state = {
      changingStreams: props.stream === ""
    };
    _this.handleLaunchClick = _this.handleLaunchClick.bind(_this);
    _this.handleCloseClick = _this.handleCloseClick.bind(_this);
    _this.updateStream = _this.updateStream.bind(_this);
    return _this;
  }

  _createClass(Frame, [{
    key: "getSrc",
    value: function getSrc() {
      if (this.props.type == "twitch") return "https://player.twitch.tv/?channel=" + this.props.stream + "&muted=true&autoplay=true";
      if (this.props.type == "twitchChat") return "https://www.twitch.tv/" + this.props.stream + "/chat";else if (this.props.type == "twitchVideo") return "https://player.twitch.tv/?video=" + this.props.stream;else if (this.props.type == "youtube") return "https://www.youtube.com/embed/" + this.props.stream + "?autoplay=1&origin=" + window.location.host;else if (this.props.type == "youtubeChat") return "https://www.youtube.com/live_chat?v=" + this.props.stream + "&embed_domain=" + window.location.host;else return this.props.stream;
    }
  }, {
    key: "handleLaunchClick",
    value: function handleLaunchClick(event, changingStreams) {
      event.preventDefault();
      event.stopPropagation();
      if (this.props.stream == "") return;
      this.setState({ changingStreams: changingStreams, src: this.getSrc() });
    }
  }, {
    key: "handleCloseClick",
    value: function handleCloseClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.props.closeFrame(this.props.id);
    }
  }, {
    key: "updateStream",
    value: function updateStream(_ref) {
      var target = _ref.target;

      var stream = target.value;
      stream = stream.replace(/\W/g, '');
      this.props.updateFrame(this.props.id, { stream: stream });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.state.changingStreams) this.setState({ src: this.getSrc() });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          src = _props.src,
          top = _props.top,
          left = _props.left,
          width = _props.width,
          height = _props.height,
          zindex = _props.zindex,
          mainRect = _props.mainRect,
          updateFrame = _props.updateFrame;


      var style = {
        top: top * 100 + "%",
        left: left * 100 + "%",
        height: height * 100 + "%",
        width: width * 100 + "%",
        zIndex: zindex
      };

      return _react2.default.createElement(
        "div",
        { className: "frame", style: style },
        _react2.default.createElement(
          "div",
          { className: "frame_top", onMouseDown: function onMouseDown(e) {
              return _this2.props.startMove(e, id, 1, 1, 0, 0);
            } },
          !this.state.changingStreams && _react2.default.createElement(
            "div",
            { className: "frame_change", onMouseDown: function onMouseDown(e) {
                return e.stopPropagation();
              }, onClick: function onClick(e) {
                return _this2.handleLaunchClick(e, true);
              } },
            "change"
          ),
          _react2.default.createElement(
            "div",
            { className: "frame_close", onMouseDown: function onMouseDown(e) {
                return e.stopPropagation();
              }, onClick: this.handleCloseClick },
            "close"
          )
        ),
        this.state.changingStreams && _react2.default.createElement(
          "div",
          { className: "change_stream" },
          _react2.default.createElement("input", { className: "stream_input", placeholder: "stream name", value: this.props.stream, onChange: this.updateStream }),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "select",
            {
              defaultValue: this.props.type,
              onChange: function onChange(_ref2) {
                var target = _ref2.target;
                console.log(target.value);updateFrame(id, { type: target.value });
              },
              className: "stream_select"
            },
            _react2.default.createElement(
              "optgroup",
              { label: "watch" },
              _react2.default.createElement(
                "option",
                { value: "twitch" },
                " twitch stream "
              ),
              _react2.default.createElement(
                "option",
                { value: "youtube" },
                " youtube video/stream "
              )
            ),
            _react2.default.createElement(
              "optgroup",
              { label: "chat" },
              _react2.default.createElement(
                "option",
                { value: "twitchChat" },
                " twitch chat "
              ),
              _react2.default.createElement(
                "option",
                { value: "youtubeChat" },
                " youtube chat "
              )
            )
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "div",
            { className: "run_change", onClick: function onClick(e) {
                return _this2.handleLaunchClick(e, false);
              } },
            "launch stream"
          )
        ),
        !this.state.changingStreams && this.state.src && _react2.default.createElement("iframe", {
          className: "video_frame",
          style: { border: "none" },
          src: this.state.src,
          height: height * window.innerHeight,
          width: width * window.innerWidth,
          frameBorder: "0",
          scrolling: "no",
          allowFullScreen: "true"
        }),
        _react2.default.createElement("div", { className: "frame_left", onMouseDown: function onMouseDown(e) {
            return _this2.props.startMove(e, id, 0, 1, 0, -1);
          } }),
        _react2.default.createElement("div", { className: "frame_height", onMouseDown: function onMouseDown(e) {
            return _this2.props.startMove(e, id, 0, 0, 1, 0);
          } }),
        _react2.default.createElement("div", { className: "frame_width", onMouseDown: function onMouseDown(e) {
            return _this2.props.startMove(e, id, 0, 0, 0, 1);
          } }),
        _react2.default.createElement("div", { className: "frame_h_and_w", onMouseDown: function onMouseDown(e) {
            return _this2.props.startMove(e, id, 0, 0, 1, 1);
          } }),
        _react2.default.createElement("div", { className: "frame_w_and_h", onMouseDown: function onMouseDown(e) {
            return _this2.props.startMove(e, id, 0, 1, 1, -1);
          } }),
        _react2.default.createElement("div", { className: "frame_h_and_w_top", onMouseDown: function onMouseDown(e) {
            return _this2.props.startMove(e, id, 1, 0, -1, 1);
          } }),
        _react2.default.createElement("div", { className: "frame_w_and_h_top", onMouseDown: function onMouseDown(e) {
            return _this2.props.startMove(e, id, 1, 1, -1, -1);
          } })
      );
    }
  }]);

  return Frame;
}(_react.Component);

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Help = undefined;

var _react = __webpack_require__(73);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Help = exports.Help = function Help(props) {
  return _react2.default.createElement(
    "div",
    { style: { opacity: props.fade ? "" : "1" }, className: "help_text" },
    _react2.default.createElement(
      "pre",
      { className: "description" },
      "the twitch and youtube player",
      _react2.default.createElement("br", null),
      _react2.default.createElement("br", null),
      "currently in beta, so please be kind",
      _react2.default.createElement("br", null),
      "issues should go to the ",
      _react2.default.createElement(
        "a",
        { target: "_blank", href: "https://github.com/bobkingof12vs/tayplayer" },
        "github page"
      )
    ),
    _react2.default.createElement(
      "pre",
      { style: { margin: 0 } },
      _react2.default.createElement("br", null),
      _react2.default.createElement("br", null),
      _react2.default.createElement("br", null),
      _react2.default.createElement("br", null),
      _react2.default.createElement(
        "strong",
        null,
        "directions:"
      ),
      _react2.default.createElement("br", null),
      "1. click the \"new window\" button in the top left",
      _react2.default.createElement("br", null),
      "2. pick your stream provider",
      _react2.default.createElement("br", null),
      "3. determine your stream (the underlined parts in the examples below)",
      _react2.default.createElement("br", null),
      "   - twitch: www.twitch.tv/",
      _react2.default.createElement(
        "span",
        { style: { color: "#aaa", textDecoration: "underline" } },
        "basetradetv"
      ),
      _react2.default.createElement("br", null),
      "   - youtube: www.youtube.com/watch?v=",
      _react2.default.createElement(
        "span",
        { style: { color: "#aaa", textDecoration: "underline" } },
        "4qqRZnO5z3g"
      ),
      _react2.default.createElement("br", null),
      "4. hit \"launch stream\"",
      _react2.default.createElement("br", null),
      "5. move and resize the stream",
      _react2.default.createElement("br", null),
      "   - move by dragging the top bar",
      _react2.default.createElement("br", null),
      "   - resize by grabbing the edges",
      _react2.default.createElement("br", null),
      "   - or simply hit the \"quick fit\" button up top",
      _react2.default.createElement("br", null),
      "6. share what you",
      "'",
      "re watching with the \"get link\" button"
    )
  );
};

//ave maria, gratia plena, dominus tecum
//benedicta tu in mulieribus, et benedictus fructus ventris tui, iesus
//sancta maria, mater dei, ora pro nobis peccatoribus, nunc, et in hora mortis nostrae

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(73);

var _react2 = _interopRequireDefault(_react);

var _nav = __webpack_require__(200);

var _frame2 = __webpack_require__(197);

var _help = __webpack_require__(198);

var _utils = __webpack_require__(201);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = exports.Main = function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.state = {
      frames: [],
      frameid: null,
      mouse: null,
      dir: null,
      zindex: 1,
      snap: true
    };

    _this.defaultHeight = 318 / window.innerHeight;
    _this.defaultWidth = 400 / window.innerWidth;

    _this.newFrame = _this.newFrame.bind(_this);
    _this.updateFrame = _this.updateFrame.bind(_this);
    _this.closeFrame = _this.closeFrame.bind(_this);
    _this.endMove = _this.endMove.bind(_this);
    _this.onMove = _this.onMove.bind(_this);
    _this.startMove = _this.startMove.bind(_this);
    _this.autoLayout = _this.autoLayout.bind(_this);
    _this.buildUrl = _this.buildUrl.bind(_this);
    _this.setUrl = _this.setUrl.bind(_this);
    _this.setSnap = _this.setSnap.bind(_this);
    return _this;
  }

  _createClass(Main, [{
    key: 'setSnap',
    value: function setSnap() {
      this.setState({ snap: !this.state.snap });
    }
  }, {
    key: 'newFrame',
    value: function newFrame() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var frames = Array.from(this.state.frames);
      frames.push({
        id: Date.now(),
        top: .25 + .25 * Math.random(),
        left: .25 + .25 * Math.random(),
        height: this.defaultHeight,
        width: this.defaultWidth,
        zindex: this.state.zindex,
        type: "twitch",
        stream: ""
      });
      this.setState({ frames: frames, zindex: this.state.zindex + 1 });
    }
  }, {
    key: 'newQueryFrame',
    value: function newQueryFrame(type, stream, zindex) {
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
  }, {
    key: 'updateFrame',
    value: function updateFrame(id, value) {
      var newFrames = this.state.frames.map(function (curFrame) {
        if (curFrame.id == id) return Object.assign({}, curFrame, value);
        return Object.assign(curFrame);
      });
      this.setState({ frames: newFrames }, this.setUrl);
    }
  }, {
    key: 'closeFrame',
    value: function closeFrame(id) {
      var newFrames = this.state.frames.filter(function (i) {
        return i.id != id;
      });
      this.setState({ frames: newFrames }, this.setUrl);
    }
  }, {
    key: 'startMove',
    value: function startMove(event, id, y, x, h, w) {
      var _this2 = this;

      event.stopPropagation();
      event.preventDefault();
      window.addEventListener("mousemove", this.onMove);
      window.addEventListener("mouseup", this.endMove);
      var newFrames = this.state.frames.map(function (curFrame) {
        var frame = Object.assign(curFrame);
        if (frame.id == id) frame.zindex = _this2.state.zindex;
        return frame;
      });
      this.setState({
        frames: newFrames,
        frameid: id,
        mouse: { x: event.clientX, y: event.clientY },
        dir: { y: y, x: x, h: h, w: w },
        zindex: this.state.zindex + 1
      });
    }
  }, {
    key: 'clamp',
    value: function clamp(val, min, max) {
      return val < min ? min : val > max ? max : val;
    }
  }, {
    key: 'onMove',
    value: function onMove(_ref) {
      var _this3 = this;

      var clientX = _ref.clientX,
          clientY = _ref.clientY;
      var _state = this.state,
          frames = _state.frames,
          mouse = _state.mouse,
          dir = _state.dir,
          frameid = _state.frameid;


      var dx = (clientX - mouse.x) / window.innerWidth;
      var dy = (clientY - mouse.y) / window.innerHeight;

      var minx = 175 / window.innerWidth;
      var miny = 175 / window.innerHeight;

      var newFrames = frames.map(function (curFrame) {
        if (curFrame.id == frameid) {
          var newFrame = Object.assign(curFrame);
          newFrame.height = _this3.clamp(newFrame.height + dir.h * dy, miny, 1);
          newFrame.width = _this3.clamp(newFrame.width + dir.w * dx, minx, 1);
          newFrame.top = _this3.clamp(newFrame.top + dir.y * dy, 0, .98);
          newFrame.left = _this3.clamp(newFrame.left + dir.x * dx, .03 - newFrame.width, .98);
          return newFrame;
        }
        return Object.assign(curFrame);
      });
      this.setState({
        frames: newFrames,
        mouse: { x: clientX, y: clientY }
      });
    }
  }, {
    key: 'endMove',
    value: function endMove() {
      window.removeEventListener("mousemove", this.onMove);
      this.setState({ mouse: null, dir: null, frameid: null });
    }
  }, {
    key: 'autoLayout',
    value: function autoLayout() {

      var chats = this.state.frames.filter(function (f) {
        return f.type == "twitchChat" || f.type == "youtubeChat";
      });
      var streams = this.state.frames.filter(function (f) {
        return f.type == "twitch" || f.type == "youtube";
      });

      var count = streams.length;
      var width = window.innerWidth - (chats.length > 0 ? 280 : 0);
      var height = window.innerHeight;

      var bestx = 1,
          besty = 1,
          bestArea = 1,
          area = void 0;

      for (var i = 1; i <= count; i++) {
        for (var j = 1; j <= count; j++) {
          if (i * j < count) continue;

          var splitWidth = width / i;
          var splitHeight = height / j;

          if (splitHeight > splitWidth * (3 / 4)) area = splitWidth * (splitWidth * (3 / 4));else area = splitHeight * (splitHeight * (4 / 3));

          if (area * count > bestArea) {
            bestx = i;
            besty = j;
            bestArea = area * count;
          }
        }
      }

      var curx = -1,
          cury = 0,
          chaty = 0;

      var newWidth = width / bestx / window.innerWidth;
      var newHeight = height / besty / window.innerHeight;

      var newFrames = this.state.frames.map(function (_frame, index) {

        var frame = Object.assign({}, _frame);

        if (frame.type == "twitch" || frame.type == "twitchVideo" || frame.type == "youtube") {
          curx++;
          if (curx >= bestx) {
            cury++;
            curx = 0;
          }

          frame.top = cury * newHeight;
          frame.height = newHeight;
          frame.left = curx * newWidth;
          frame.width = newWidth;
        } else {
          frame.top = chaty++ / chats.length;
          frame.height = 1 / chats.length;
          frame.left = (window.innerWidth - 280) / window.innerWidth;
          frame.width = 280 / window.innerWidth;
        }
        return frame;
      });

      this.setState({ frames: newFrames });
    }
  }, {
    key: 'buildUrl',
    value: function buildUrl() {
      var streams = { twitch: [], twitchChat: [], twitchVideo: [], youtube: [], youtubeChat: [] };
      this.state.frames.map(function (f) {
        return f.stream !== "" && streams[f.type].push(f.stream);
      });

      var url = window.location.origin + window.location.pathname + "?";
      if (streams.twitch.length > 0) url += "twitch=" + streams.twitch.join(',') + "&";
      if (streams.twitchChat.length > 0) url += "tchat=" + streams.twitchChat.join(',') + "&";
      //if(streams.twitchVideo.length > 0)
      //url += "tvideo="+streams.twitchVideo.join(',')+"&";
      if (streams.youtube.length > 0) url += "youtube=" + streams.youtube.join(',') + "&";
      if (streams.youtubeChat.length > 0) url += "ychat=" + streams.youtubeChat.join(',');
      return url;
    }
  }, {
    key: 'setUrl',
    value: function setUrl() {
      window.history.replaceState("", "", this.buildUrl());
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      var twitch = (0, _utils.getParameterByName)("twitch");
      var tchat = (0, _utils.getParameterByName)("tchat");
      var tvideo = (0, _utils.getParameterByName)("tvideo");
      var youtube = (0, _utils.getParameterByName)("youtube");
      var ychat = (0, _utils.getParameterByName)("ychat");

      var frames = [],
          zindex = 1;
      twitch && twitch.split(',').map(function (t) {
        return frames.push(_this4.newQueryFrame("twitch", t, zindex++));
      });
      tchat && tchat.split(',').map(function (t) {
        return frames.push(_this4.newQueryFrame("twitchChat", t, zindex++));
      });
      tvideo && tvideo.split(',').map(function (t) {
        return frames.push(_this4.newQueryFrame("twitchVideo", t, zindex++));
      });
      youtube && youtube.split(',').map(function (t) {
        return frames.push(_this4.newQueryFrame("youtube", t, zindex++));
      });
      ychat && ychat.split(',').map(function (t) {
        return frames.push(_this4.newQueryFrame("youtubeChat", t, zindex++));
      });
      this.setState({ frames: frames, zindex: zindex });

      this.autoLayout();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { id: 'main', onMouseUp: this.endMove },
        _react2.default.createElement(_help.Help, { fade: this.state.frames.length != 0 }),
        _react2.default.createElement(_nav.Nav, _extends({}, this.state, {
          newWindow: this.newFrame,
          autoLayout: this.autoLayout,
          setSnap: this.setSnap
        })),
        this.state.frames.map(function (frame) {
          return _react2.default.createElement(_frame2.Frame, _extends({
            key: frame.id
          }, frame, {
            updateFrame: _this5.updateFrame,
            closeFrame: _this5.closeFrame,
            startMove: _this5.startMove
          }));
        }),
        this.state.dir !== null && _react2.default.createElement('div', { className: 'blocker' })
      );
    }
  }]);

  return Main;
}(_react.Component);

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nav = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(73);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = exports.Nav = function (_Component) {
  _inherits(Nav, _Component);

  function Nav(props) {
    _classCallCheck(this, Nav);

    var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

    _this.state = {
      expand: true
    };
    return _this;
  }

  _createClass(Nav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { style: this.props.style, className: "nav_bar" },
        this.state.expand && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            {
              className: "nav_item",
              onClick: this.props.newWindow
            },
            "new window"
          ),
          _react2.default.createElement(
            "div",
            {
              className: "nav_item",
              onClick: this.props.autoLayout
            },
            this.state.expand ? "quick fit" : "q"
          ),
          _react2.default.createElement(
            "div",
            {
              className: "nav_item",
              style: { width: "133px" },
              onClick: this.props.setSnap
            },
            "border snap: ",
            this.props.snap ? "on" : "off"
          )
        ),
        _react2.default.createElement(
          "div",
          {
            className: "nav_item",
            onClick: function onClick() {
              return _this2.setState({ expand: !_this2.state.expand });
            }
          },
          this.state.expand ? "hide menu" : "+"
        )
      );
    }
  }]);

  return Nav;
}(_react.Component);

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getParameterByName = getParameterByName;
//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(196);
module.exports = __webpack_require__(195);


/***/ })

},[484]);
//# sourceMappingURL=main.js.map