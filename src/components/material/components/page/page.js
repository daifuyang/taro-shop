import React from 'react';
import { View } from '@tarojs/components';
var Page = function Page(_ref) {
  var children = _ref.children,
    __designMode = _ref.__designMode;
  var Div = 'div';
  if (__designMode !== 'design' && View) {
    Div = View;
  }
  return /*#__PURE__*/React.createElement(Div, {
    className: "lce-page"
  }, children);
};
Page.displayName = 'Page';
export default Page;