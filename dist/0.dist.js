(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/renderer/components/ProjectDetail/ProjectCard.js":
/*!**************************************************************!*\
  !*** ./src/renderer/components/ProjectDetail/ProjectCard.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProjectCard = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _debug = _interopRequireDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ "./node_modules/react-router-redux/es/index.js");

var _assetsUtils = __webpack_require__(/*! ../../utils/assetsUtils */ "./src/renderer/utils/assetsUtils.js");

var _StyledProjectCard = __webpack_require__(/*! ../../stylesheets/application/ProjectIndex/StyledProjectCard */ "./src/renderer/stylesheets/application/ProjectIndex/StyledProjectCard.js");

var _projectUtils = __webpack_require__(/*! ../../utils/projectUtils */ "./src/renderer/utils/projectUtils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var debug = (0, _debug.default)('fabnavi:RelatedProjects:ProjectCard');

var ProjectCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProjectCard, _React$Component);

  function ProjectCard(props) {
    var _this;

    _classCallCheck(this, ProjectCard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProjectCard).call(this, props));

    _this.toProjectDetail = function () {
      _this.props.toProjectDetail(_this.props.id);
    };

    return _this;
  }

  _createClass(ProjectCard, [{
    key: "render",
    value: function render() {
      var project = (0, _projectUtils.sanitizeProject)(this.props.project);
      var projectType = typeof project.content[0] === 'undefined' ? 'Photo' : project.content[0].type.split('::')[1];
      var isPrivate = project.private;
      return _react.default.createElement("div", null, _react.default.createElement(_StyledProjectCard.ProjectFrame, {
        onClick: this.toProjectDetail,
        index: this.props.index
      }, _react.default.createElement(_StyledProjectCard.ProjectThumb, null, _react.default.createElement("img", {
        src: project.thumbnail
      })), _react.default.createElement(_StyledProjectCard.InsideFrame, null, _react.default.createElement(_StyledProjectCard.ProjectTitle, {
        lang: "ja"
      }, project.name), project.description === '' ? _react.default.createElement(_StyledProjectCard.ProjectDescription, null) : _react.default.createElement(_StyledProjectCard.ProjectDescription, null, project.description), _react.default.createElement(_StyledProjectCard.StatusFrame, null, _react.default.createElement(_StyledProjectCard.ProjectUser, {
        src: project.userIcon,
        user: true
      }), _react.default.createElement(_StyledProjectCard.UserName, null, project.user.nickname), _react.default.createElement(_StyledProjectCard.CardProjectTypeLabel, {
        type: projectType
      }))), isPrivate && _react.default.createElement(_StyledProjectCard.PrivateLabel, {
        src: "".concat(_assetsUtils.assetsPath, "/images/PrivateLabel.png")
      }), _react.default.createElement(_StyledProjectCard.ProjectTypeLabel, {
        type: projectType
      })));
    }
  }]);

  return ProjectCard;
}(_react.default.Component);

exports.ProjectCard = ProjectCard;
ProjectCard.propTypes = {
  content: _propTypes.default.arrayOf(_propTypes.default.object),
  selectMenuItem: _propTypes.default.func,
  toggleMenu: _propTypes.default.func,
  selectedId: _propTypes.default.number,
  toProjectDetail: _propTypes.default.func,
  index: _propTypes.default.number,
  project: _propTypes.default.object,
  id: _propTypes.default.number
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toProjectDetail: function toProjectDetail(projectId) {
      dispatch((0, _reactRouterRedux.push)("/detail/".concat(projectId)));
    }
  };
};

var _default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ProjectCard);

exports.default = _default;

/***/ }),

/***/ "./src/renderer/components/ProjectDetail/RelatedProjects.js":
/*!******************************************************************!*\
  !*** ./src/renderer/components/ProjectDetail/RelatedProjects.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _debug = _interopRequireDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js"));

var _ProjectCard = _interopRequireDefault(__webpack_require__(/*! ./ProjectCard */ "./src/renderer/components/ProjectDetail/ProjectCard.js"));

var _RelatedProjects = __webpack_require__(/*! ../../stylesheets/application/ProjectShow/RelatedProjects */ "./src/renderer/stylesheets/application/ProjectShow/RelatedProjects.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var debug = (0, _debug.default)('fabnavi:componens:RelatedProjects');

var RelatedProjects =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RelatedProjects, _React$Component);

  function RelatedProjects(props) {
    _classCallCheck(this, RelatedProjects);

    return _possibleConstructorReturn(this, _getPrototypeOf(RelatedProjects).call(this, props));
  }

  _createClass(RelatedProjects, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _projects = this.props.projects;
      var tag = this.props.tag;
      var projects = _projects[tag];
      var checkProjects = !Object.keys(_projects).length;
      var projectList = checkProjects ? _react.default.createElement("div", null, "Now Loading ...") : projects.map(function (content, index) {
        return _react.default.createElement(_ProjectCard.default, {
          project: content,
          key: index,
          id: content.id
        });
      });
      return _react.default.createElement(_RelatedProjects.ProjectFrame, null, projectList);
    }
  }]);

  return RelatedProjects;
}(_react.default.Component);

RelatedProjects.propTypes = {
  projects: _propTypes.default.object,
  tag: _propTypes.default.string
};

var _default = (0, _reactRedux.connect)(null, null)(RelatedProjects);

exports.default = _default;

/***/ }),

/***/ "./src/renderer/stylesheets/application/ProjectShow/RelatedProjects.js":
/*!*****************************************************************************!*\
  !*** ./src/renderer/stylesheets/application/ProjectShow/RelatedProjects.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectFrame = void 0;

var _styledComponents = _interopRequireWildcard(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.es.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  overflow-x: scroll;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ProjectFrame = _styledComponents.default.div(_templateObject());

exports.ProjectFrame = ProjectFrame;

/***/ })

}]);
//# sourceMappingURL=0.dist.js.map