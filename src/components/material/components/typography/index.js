import * as React from 'react';
import { View } from '@tarojs/components';
import clx from 'classnames';
var Typography = function Typography(props) {
  var __designMode = props.__designMode,
    title = props.title,
    desc = props.desc,
    textAlign = props.textAlign,
    titleFontSize = props.titleFontSize,
    descFontSize = props.descFontSize,
    titleFontWeight = props.titleFontWeight,
    descFontWeight = props.descFontWeight,
    titleColor = props.titleColor,
    descColor = props.descColor,
    backgroundColor = props.backgroundColor,
    divider = props.divider;
  var titleStyle = {
    textAlign: textAlign,
    fontSize: Number(titleFontSize),
    fontWeight: titleFontWeight,
    color: titleColor
  };
  var descStyle = {
    textAlign: textAlign,
    fontSize: Number(descFontSize),
    fontWeight: descFontWeight,
    color: descColor
  };
  var Component = 'div';
  if (__designMode !== 'design' && View) {
    Component = View;
  }
  return /*#__PURE__*/React.createElement(Component, {
    style: {
      backgroundColor: backgroundColor
    },
    className: "taro-typography"
  }, /*#__PURE__*/React.createElement(Component, {
    className: clx({
      "taro-typography-container": true,
      "has-divider": divider
    })
  }, title && /*#__PURE__*/React.createElement(Component, {
    style: titleStyle,
    className: "taro-title"
  }, title), desc && /*#__PURE__*/React.createElement(Component, {
    style: descStyle,
    className: "taro-desc"
  }, desc)));
};
export default Typography;