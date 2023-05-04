'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClearAllTags = function ClearAllTags(props) {
  return _react2.default.createElement(
    'button',
    { className: props.classNames.clearAll, onClick: props.onClick },
    'Clear all'
  );
};

ClearAllTags.propTypes = {
  classNames: _propTypes2.default.object,
  onClick: _propTypes2.default.func
};

exports.default = ClearAllTags;