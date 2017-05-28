webpackJsonp([1],{

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(91);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(397);

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
      changingStreams: true,
      type: "twitchStream",
      stream: ""
    };

    _this.handleLaunchClick = _this.handleLaunchClick.bind(_this);
    _this.handleCloseClick = _this.handleCloseClick.bind(_this);
    return _this;
  }

  _createClass(Frame, [{
    key: "startPlayer",
    value: function startPlayer() {
      var _props = this.props,
          id = _props.id,
          src = _props.src,
          top = _props.top,
          left = _props.left,
          width = _props.width,
          height = _props.height;

      if (player == "twitch") var options = {
        width: width,
        height: height - 18,
        channel: "starcraft"
      };
      var player = new Twitch.Player("frame" + id, options);
      player.setVolume(0.0);
    }
  }, {
    key: "handleLaunchClick",
    value: function handleLaunchClick(event, changingStreams) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ changingStreams: changingStreams });
    }
  }, {
    key: "handleCloseClick",
    value: function handleCloseClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.props.closeFrame(this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          id = _props2.id,
          src = _props2.src,
          top = _props2.top,
          left = _props2.left,
          width = _props2.width,
          height = _props2.height;


      var style = {
        top: top + "px",
        left: left + "px",
        width: width + "px",
        height: height + "px"
      };

      return _react2.default.createElement(
        "div",
        { className: "frame", style: style },
        _react2.default.createElement(
          "div",
          { className: "frame_top" },
          !this.state.changingStreams && _react2.default.createElement(
            "div",
            { className: "frame_change", onClick: function onClick(e) {
                return _this2.handleLaunchClick(e, true);
              } },
            "change stream"
          ),
          _react2.default.createElement(
            "div",
            { className: "frame_close", onClick: this.handleCloseClick },
            "close frame"
          )
        ),
        this.state.changingStreams && _react2.default.createElement(
          "div",
          { className: "change_stream" },
          _react2.default.createElement("input", { className: "stream_input", placeholder: "stream name", value: this.state.stream, onChange: function onChange(_ref) {
              var target = _ref.target;
              return _this2.setState({ stream: target.value });
            } }),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "label",
            null,
            _react2.default.createElement("input", { type: "radio", checked: this.state.type == "twitchStream", onChange: function onChange() {
                return _this2.setState({ type: "twitchStream" });
              } }),
            "twitch stream"
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "label",
            null,
            _react2.default.createElement("input", { type: "radio", checked: this.state.type == "twitchChat", onChange: function onChange() {
                return _this2.setState({ type: "twitchChat" });
              } }),
            "twitch chat"
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "label",
            null,
            _react2.default.createElement("input", { type: "radio", checked: this.state.type == "youtube", onChange: function onChange() {
                return _this2.setState({ type: "youtube" });
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
        !this.state.changingStreams && _react2.default.createElement(
          "div",
          { id: "frame" + id, className: "video_frame" },
          this.state.stream
        ),
        _react2.default.createElement("div", { className: "frame_left" }),
        _react2.default.createElement("div", { className: "frame_height" }),
        _react2.default.createElement("div", { className: "frame_width" })
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

var _frame = __webpack_require__(197);

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
      frames: []
    };

    _this.defaultHeight = 300;
    _this.defaultWidth = 400;

    _this.newFrame = _this.newFrame.bind(_this);
    _this.updateFrame = _this.updateFrame.bind(_this);
    _this.closeFrame = _this.closeFrame.bind(_this);
    return _this;
  }

  _createClass(Main, [{
    key: 'newFrame',
    value: function newFrame() {
      var _this2 = this;

      var rect = this.refs.main.getBoundingClientRect();
      var frames = Array.from(this.state.frames);
      frames.push({
        id: Date.now(),
        src: null,
        top: Math.floor(rect.height / 2 - this.defaultHeight / 2),
        left: Math.floor(rect.width / 2 - this.defaultWidth / 2),
        height: this.defaultHeight,
        width: this.defaultWidth
      });
      this.setState({ frames: frames }, function () {
        return console.log(_this2.state.frames);
      });
    }
  }, {
    key: 'updateFrame',
    value: function updateFrame(newFrame) {
      var newFrames = this.state.frames.map(function (curFrame) {
        if (curFrame.id == newFrame.id) return Object.assign(newFrame);
        return Object.assign(curFrame);
      });
      this.setState({ frames: newFrames });
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { id: 'main', ref: 'main' },
        _react2.default.createElement(_nav.Nav, { newWindow: this.newFrame }),
        this.state.frames.map(function (frame) {
          return _react2.default.createElement(_frame.Frame, _extends({
            key: frame.id
          }, frame, {
            updateFrame: _this3.updateFrame,
            closeFrame: _this3.closeFrame
          }));
        })
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
        { className: "nav_bar" },
        _react2.default.createElement(
          "span",
          {
            className: "nav_item",
            onClick: this.props.newWindow
          },
          " new window "
        )
      );
    }
  }]);

  return Nav;
}(_react.Component);

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(196);
module.exports = __webpack_require__(195);


/***/ })

},[482]);
//# sourceMappingURL=main.js.map