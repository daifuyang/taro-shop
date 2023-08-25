import * as React from 'react';
import { useContext } from 'react';
import { ConfigContext } from "../ConfigContext";
import { View, Image } from '@tarojs/components';
import { getPrevPath } from "../../utils/util";
var Grid = function Grid(props) {
  var __designMode = props.__designMode,
    _props$columns = props.columns,
    columns = _props$columns === void 0 ? 4 : _props$columns,
    _props$data = props.data,
    data = _props$data === void 0 ? [] : _props$data;
  var _ref = useContext(ConfigContext) || {},
    _ref$config = _ref.config,
    config = _ref$config === void 0 ? {} : _ref$config;
  var actionTo = config.actionTo;
  var Div = 'div';
  var Img = 'img';
  if (__designMode !== 'design' && View) {
    Div = View;
    Img = Image;
  }
  return /*#__PURE__*/React.createElement(Div, {
    className: "taro-grid"
  }, data === null || data === void 0 ? void 0 : data.map(function (item, i) {
    var prevPath = getPrevPath(item);
    return /*#__PURE__*/React.createElement(Div, {
      onClick: function onClick() {
        if (actionTo) {
          actionTo(item.action);
        }
      },
      key: i,
      className: "taro-grid-item"
    }, /*#__PURE__*/React.createElement(Div, {
      className: "taro-grid-item-content"
    }, /*#__PURE__*/React.createElement(Div, {
      className: "icon",
      style: {
        backgroundImage: "url(" + prevPath + ")"
      }
    }), /*#__PURE__*/React.createElement(Div, {
      className: "taro-grid-item-text"
    }, item.title)));
  }), !(data !== null && data !== void 0 && data.length) && /*#__PURE__*/React.createElement("div", {
    className: "taro-grid-empty"
  }, "\u8BF7\u5728\u53F3\u4FA7\u6DFB\u52A0\u56FE\u6587\u5BFC\u822A"));
};
export default Grid;