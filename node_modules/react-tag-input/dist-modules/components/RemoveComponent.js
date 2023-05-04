'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crossStr = String.fromCharCode(215);
var RemoveComponent = function RemoveComponent(props) {
  var readOnly = props.readOnly,
      removeComponent = props.removeComponent,
      onRemove = props.onRemove,
      className = props.className,
      tag = props.tag,
      index = props.index;


  var onKeydown = function onKeydown(event) {
    if (_constants.KEYS.ENTER.includes(event.keyCode) || event.keyCode === _constants.KEYS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.keyCode === _constants.KEYS.BACKSPACE) {
      onRemove(event);
    }
  };

  if (readOnly) {
    return _react2.default.createElement('span', null);
  }

  var ariaLabel = 'Tag at index ' + index + ' with value ' + tag.id + ' focussed. Press backspace to remove';
  if (removeComponent) {
    var Component = removeComponent;
    return _react2.default.createElement(Component, {
      onRemove: onRemove,
      onKeyDown: onKeydown,
      className: className,
      'aria-label': ariaLabel,
      tag: tag,
      index: index
    });
  }

  return _react2.default.createElement(
    'button',
    {
      onClick: onRemove,
      onKeyDown: onKeydown,
      className: className,
      type: 'button',
      'aria-label': ariaLabel },
    crossStr
  );
};

RemoveComponent.propTypes = {
  className: _propTypes2.default.string,
  onRemove: _propTypes2.default.func.isRequired,
  readOnly: _propTypes2.default.bool,
  removeComponent: _propTypes2.default.func,
  tag: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    key: _propTypes2.default.string
  }),
  index: _propTypes2.default.number.isRequired
};

exports.default = RemoveComponent;