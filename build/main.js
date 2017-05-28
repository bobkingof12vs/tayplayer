webpackJsonp([1],{

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(478);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(394);

var _main = __webpack_require__(483);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_main.Main, null), document.getElementById('app'));

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(195);
module.exports = __webpack_require__(194);


/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nav = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(478);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(481);

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
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'nav_bar' },
        _react2.default.createElement(
          'span',
          {
            className: 'nav_item',
            onClick: this.props.newWindow
          },
          ' new window '
        )
      );
    }
  }]);

  return Nav;
}(_react.Component);

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(478);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(481);

var _nav = __webpack_require__(482);

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

    _this.newWindow = _this.newWindow.bind(_this);
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
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'main', ref: 'main' },
        _react2.default.createElement(_nav.Nav, { newWindow: this.newWindow })
      );
    }
  }]);

  return Main;
}(_react.Component);

/***/ })

},[480]);
//# sourceMappingURL=main.js.map