import * as React from 'react';
import { View, Image as TaroImage } from '@tarojs/components';
import empty from "./empty.png";
import { getPrevPath } from "../../utils/util";
var Image = function Image(props) {
  var __designMode = props.__designMode,
    _props$list = props.list,
    list = _props$list === void 0 ? [] : _props$list;
  var style = {};
  if (list.length === 0) {
    style.height = 200;
  }
  var ViewEle = 'div';
  var ImageEle = 'img';
  if (__designMode !== 'design') {
    if (View) ViewEle = View;
    if (TaroImage) ImageEle = TaroImage;
  }
  var imageRender = function imageRender() {
    if (__designMode === 'design') {
      if ((list === null || list === void 0 ? void 0 : list.length) === 0) {
        return /*#__PURE__*/React.createElement(ImageEle, {
          mode: "widthFix",
          style: {
            width: '100%',
            height: '100%'
          },
          src: empty
        });
      }
    }
    return /*#__PURE__*/React.createElement(ViewEle, {
      className: "ui taro-image"
    }, list === null || list === void 0 ? void 0 : list.map(function (item, i) {
      var prevPath = getPrevPath(item) || empty;
      return /*#__PURE__*/React.createElement(ViewEle, {
        key: i,
        className: "li"
      }, /*#__PURE__*/React.createElement(ImageEle, {
        mode: "widthFix",
        style: {
          width: '100%'
        },
        key: i,
        src: prevPath,
        alt: item === null || item === void 0 ? void 0 : item.alt
      }));
    }));
  };
  return /*#__PURE__*/React.createElement(ViewEle, {
    style: style
  }, imageRender());
};
export default Image;