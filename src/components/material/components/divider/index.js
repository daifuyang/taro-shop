import * as React from 'react';
import { View } from '@tarojs/components';
var Divider = function Divider(props) {
  var type = props.type,
    __designMode = props.__designMode,
    borderStyle = props.borderStyle,
    padding = props.padding,
    borderColor = props.borderColor;
  var _props$height = props.height,
    height = _props$height === void 0 ? 8 : _props$height;
  var Component = 'div';
  if (__designMode !== 'design' && View) {
    Component = View;
  }
  if (height < 8) {
    height = 8;
  }
  if (type === 'block') {
    return /*#__PURE__*/React.createElement(Component, {
      className: "taro-margin",
      style: {
        height: height
      }
    });
  }
  return /*#__PURE__*/React.createElement(Component, {
    style: {
      padding: padding ? '0 15px' : ''
    }
  }, /*#__PURE__*/React.createElement(Component, {
    style: {
      '--border-style': borderStyle,
      '--border-color': borderColor
    },
    className: "taro-divider"
  }));
};
export default Divider;