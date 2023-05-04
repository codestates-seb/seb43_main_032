'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _RemoveComponent = require('./RemoveComponent');

var _RemoveComponent2 = _interopRequireDefault(_RemoveComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemTypes = { TAG: 'tag' };

var Tag = function Tag(props) {
  var tagRef = (0, _react.useRef)(null);
  var readOnly = props.readOnly,
      tag = props.tag,
      classNames = props.classNames,
      index = props.index;

  var _useDrag = (0, _reactDnd.useDrag)(function () {
    return {
      type: ItemTypes.TAG,
      collect: function collect(monitor) {
        return {
          isDragging: !!monitor.isDragging()
        };
      },
      item: props,
      canDrag: function canDrag() {
        return (0, _utils.canDrag)(props);
      }
    };
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  var _useDrop = (0, _reactDnd.useDrop)(function () {
    return {
      accept: ItemTypes.TAG,
      drop: function drop(item, monitor) {
        var dragIndex = item.index;
        var hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }

        props.moveTag(dragIndex, hoverIndex);
      },
      canDrop: function canDrop(item) {
        return (0, _utils.canDrop)(item);
      }
    };
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      drop = _useDrop2[1];

  drag(drop(tagRef));

  var label = props.tag[props.labelField];
  var _tag$className = tag.className,
      className = _tag$className === undefined ? '' : _tag$className;
  /* istanbul ignore next */

  var opacity = isDragging ? 0 : 1;
  var tagComponent = _react2.default.createElement(
    'span',
    {
      ref: tagRef,
      className: (0, _classnames2.default)('tag-wrapper', classNames.tag, className),
      style: {
        opacity: opacity,
        cursor: (0, _utils.canDrag)(props) ? 'move' : 'auto'
      },
      onClick: props.onTagClicked,
      onTouchStart: props.onTagClicked },
    label,
    _react2.default.createElement(_RemoveComponent2.default, {
      tag: props.tag,
      className: classNames.remove,
      removeComponent: props.removeComponent,
      onRemove: props.onDelete,
      readOnly: readOnly,
      index: index
    })
  );
  return tagComponent;
};

Tag.propTypes = {
  labelField: _propTypes2.default.string,
  onDelete: _propTypes2.default.func.isRequired,
  tag: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    key: _propTypes2.default.string
  }),
  moveTag: _propTypes2.default.func,
  removeComponent: _propTypes2.default.func,
  onTagClicked: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  readOnly: _propTypes2.default.bool,
  index: _propTypes2.default.number.isRequired
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false
};

exports.default = Tag;