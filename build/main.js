webpackJsonp([1],{

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(91);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(398);

var _main = __webpack_require__(198);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_main.Main, null), document.getElementById('app'));

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(91);

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
    return _this;
  }

  _createClass(Frame, [{
    key: "getSrc",
    value: function getSrc() {
      if (this.props.type == "twitch") return "http://player.twitch.tv/?channel=" + this.props.stream + "&muted=true&autoplay=true";else if (this.props.type == "chat") return "http://www.twitch.tv/" + this.props.stream + "/chat";else if (this.props.type == "youtube") return "https://www.youtube.com/embed/" + this.props.stream;else return this.props.stream;
    }
  }, {
    key: "handleLaunchClick",
    value: function handleLaunchClick(event, changingStreams) {
      event.preventDefault();
      event.stopPropagation();
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
          divx = _props.divx,
          divy = _props.divy,
          updateFrame = _props.updateFrame;


      var style = {
        top: Math.round(top / divy) * divy + "px",
        left: Math.round(left / divx) * divx + "px",
        height: Math.round(height / divy) * divy + "px",
        width: Math.round(width / divx) * divx + "px",
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
          _react2.default.createElement("input", { className: "stream_input", placeholder: "stream name", value: this.props.stream, onChange: function onChange(_ref) {
              var target = _ref.target;
              return updateFrame(id, { stream: target.value });
            } }),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "label",
            null,
            _react2.default.createElement("input", { type: "radio", checked: this.props.type == "twitch", onChange: function onChange() {
                return updateFrame(id, { type: "twitch" });
              } }),
            "twitch stream"
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "label",
            null,
            _react2.default.createElement("input", { type: "radio", checked: this.props.type == "chat", onChange: function onChange() {
                return updateFrame(id, { type: "chat" });
              } }),
            "twitch chat"
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "label",
            null,
            _react2.default.createElement("input", { type: "radio", checked: this.props.type == "youtube", onChange: function onChange() {
                return updateFrame(id, { type: "youtube" });
              } }),
            "youtube"
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
          height: Math.round(height / divy) * divy - 18,
          width: Math.round(width / divx) * divx,
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
exports.Main = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(91);

var _react2 = _interopRequireDefault(_react);

var _nav = __webpack_require__(199);

var _frame2 = __webpack_require__(197);

var _help = __webpack_require__(484);

var _utils = __webpack_require__(200);

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
      divx: 1,
      divy: 1
    };

    _this.defaultHeight = 318;
    _this.defaultWidth = 400;

    _this.newFrame = _this.newFrame.bind(_this);
    _this.updateFrame = _this.updateFrame.bind(_this);
    _this.closeFrame = _this.closeFrame.bind(_this);
    _this.endMove = _this.endMove.bind(_this);
    _this.onMove = _this.onMove.bind(_this);
    _this.startMove = _this.startMove.bind(_this);
    _this.autoLayout = _this.autoLayout.bind(_this);
    return _this;
  }

  _createClass(Main, [{
    key: 'newFrame',
    value: function newFrame() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var rect = this.refs.main.getBoundingClientRect();
      var frames = Array.from(this.state.frames);
      frames.push({
        id: Date.now(),
        top: Math.floor(rect.height / 2 - this.defaultHeight / 2),
        left: Math.floor(rect.width / 2 - this.defaultWidth / 2),
        height: this.defaultHeight,
        width: this.defaultWidth,
        zindex: this.state.zindex,
        type: "",
        stream: ""
      });
      this.setState({ frames: frames, zindex: this.state.zindex + 1 });
    }
  }, {
    key: 'newQueryFrame',
    value: function newQueryFrame(type, stream, zindex) {
      var rect = this.refs.main.getBoundingClientRect();
      return {
        id: zindex,
        top: Math.floor(rect.height / 2 - this.defaultHeight / 2),
        left: Math.floor(rect.width / 2 - this.defaultWidth / 2),
        height: this.defaultHeight,
        width: this.defaultWidth,
        zindex: this.state.zindex,
        type: type,
        stream: stream
      };
    }
  }, {
    key: 'updateFrame',
    value: function updateFrame(id, value) {
      var _this2 = this;

      var newFrames = this.state.frames.map(function (curFrame) {
        if (curFrame.id == id) return Object.assign({}, curFrame, value);
        return Object.assign(curFrame);
      });
      this.setState({ frames: newFrames }, function () {
        return console.log(_this2.state.frames);
      });
    }
  }, {
    key: 'closeFrame',
    value: function closeFrame(id) {
      var newFrames = this.state.frames.filter(function (i) {
        return i.id != id;
      });
      this.setState({ frames: newFrames });
    }
  }, {
    key: 'startMove',
    value: function startMove(event, id, y, x, h, w) {
      var _this3 = this;

      window.addEventListener("mousemove", this.onMove);
      window.addEventListener("mouseup", this.endMove);
      var newFrames = this.state.frames.map(function (curFrame) {
        var frame = Object.assign(curFrame);
        if (frame.id == id) frame.zindex = _this3.state.zindex;
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
      var _this4 = this;

      var clientX = _ref.clientX,
          clientY = _ref.clientY;

      var mainRect = this.refs.main.getBoundingClientRect();
      var _state = this.state,
          frames = _state.frames,
          mouse = _state.mouse,
          dir = _state.dir,
          frameid = _state.frameid,
          divy = _state.divy;


      var dx = clientX - mouse.x;
      var dy = clientY - mouse.y;

      var newFrames = frames.map(function (curFrame) {
        if (curFrame.id == frameid) {
          var newFrame = Object.assign(curFrame);
          newFrame.top = _this4.clamp(newFrame.top + dir.y * dy, divy, mainRect.height - divy);
          newFrame.left = _this4.clamp(newFrame.left + dir.x * dx, 0, mainRect.width - 12);
          newFrame.height = _this4.clamp(newFrame.height + dir.h * dy, 175, mainRect.height - divy - 18);
          newFrame.width = _this4.clamp(newFrame.width + dir.w * dx, 175, mainRect.width);
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
      var _this5 = this;

      var count = this.state.frames.length;
      var rect = this.refs.main.getBoundingClientRect();
      var width = rect.width - 9;
      var height = rect.height - this.state.divy;

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
          cury = 0;
      var newFrames = this.state.frames.map(function (_frame, index) {
        var frame = Object.assign({}, _frame);
        curx++;
        if (curx >= bestx) {
          cury++;
          curx = 0;
        }

        frame.top = cury * Math.floor(height / besty) + _this5.state.divy;
        frame.height = Math.floor(height / besty);
        frame.left = curx * Math.floor(width / bestx);
        frame.width = (index == _this5.state.frames.length - 1 ? bestx - curx : 1) * Math.floor(width / bestx);

        return frame;
      });

      this.setState({ frames: newFrames });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this6 = this;

      var rect = this.refs.main.getBoundingClientRect();
      var divx = rect.width / Math.floor(rect.width / 25);
      var divy = rect.width / Math.floor(rect.width / 25);

      var twitch = (0, _utils.getParameterByName)("twitch");
      var chat = (0, _utils.getParameterByName)("chat");
      var youtube = (0, _utils.getParameterByName)("youtube");

      var frames = [],
          zindex = 1;
      twitch && twitch.split(',').map(function (t) {
        return frames.push(_this6.newQueryFrame("twitch", t, zindex++));
      });
      chat && chat.split(',').map(function (t) {
        return frames.push(_this6.newQueryFrame("chat", t, zindex++));
      });
      youtube && youtube.split(',').map(function (t) {
        return frames.push(_this6.newQueryFrame("youtube", t, zindex++));
      });

      this.setState({ divx: divx, divy: divy, frames: frames, zindex: zindex }, this.autoLayout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      return _react2.default.createElement(
        'div',
        { id: 'main', ref: 'main', onMouseUp: this.endMove },
        _react2.default.createElement(_help.Help, { fade: this.state.frames.length != 0 }),
        _react2.default.createElement(_nav.Nav, {
          style: { height: this.state.divy + 'px', lineHeight: this.state.divy + 'px' },
          newWindow: this.newFrame,
          autoLayout: this.autoLayout
        }),
        this.state.frames.map(function (frame) {
          return _react2.default.createElement(_frame2.Frame, _extends({
            key: frame.id
          }, frame, {
            divx: _this7.state.divx,
            divy: _this7.state.divy,
            updateFrame: _this7.updateFrame,
            closeFrame: _this7.closeFrame,
            startMove: _this7.startMove,
            mainRect: _this7.refs.main.getBoundingClientRect()
          }));
        }),
        this.state.dir !== null && _react2.default.createElement('div', { className: 'blocker' })
      );
    }
  }]);

  return Main;
}(_react.Component);

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nav = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(91);

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

    _this.state = {};
    return _this;
  }

  _createClass(Nav, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { style: this.props.style, className: "nav_bar" },
        _react2.default.createElement(
          "span",
          {
            className: "nav_item",
            onClick: this.props.newWindow
          },
          "new window"
        ),
        _react2.default.createElement(
          "span",
          {
            className: "nav_item",
            onClick: this.props.autoLayout
          },
          "quick fit"
        ),
        _react2.default.createElement(
          "span",
          {
            className: "nav_item",
            onClick: this.props.autoLayout
          },
          "get link"
        )
      );
    }
  }]);

  return Nav;
}(_react.Component);

/***/ }),

/***/ 200:
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

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(196);
module.exports = __webpack_require__(195);


/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Help = undefined;

var _react = __webpack_require__(91);

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
        { href: "" },
        "github page"
      )
    ),
    _react2.default.createElement(
      "pre",
      { style: { margin: 0 } },
      _react2.default.createElement("br", null),
      " ",
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
      "  twitch: www.twitch.tv/",
      _react2.default.createElement(
        "span",
        { style: { color: "#aaa", textDecoration: "underline" } },
        "basetradetv"
      ),
      _react2.default.createElement("br", null),
      "  youtube: www.youtube.com/watch?v=",
      _react2.default.createElement(
        "span",
        { style: { color: "#aaa", textDecoration: "underline" } },
        "4qqRZnO5z3g"
      ),
      _react2.default.createElement("br", null),
      "    (yes, any youtube video works)",
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

/***/ })

},[483]);
//# sourceMappingURL=main.js.map