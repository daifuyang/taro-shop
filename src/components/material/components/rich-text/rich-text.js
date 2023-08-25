import * as React from 'react';
import { View } from '@tarojs/components';
var RichText = function RichText(_ref) {
  var html = _ref.html,
    __designMode = _ref.__designMode;
  var Component = 'div';
  if (__designMode !== 'design' && View) {
    Component = View;
  } else if (!html) {
    html = " <p>\u70B9\u6B64\u7F16\u8F91\u300E\u5BCC\u6587\u672C\u300F\u5185\u5BB9 &mdash;&mdash;&gt;</p>\n<p>\u4F60\u53EF\u4EE5\u5BF9\u6587\u5B57\u8FDB\u884C<strong>\u52A0\u7C97</strong>\u3001<em>\u659C\u4F53</em>\u3001<span style=\"text-decoration: underline;\">\u4E0B\u5212\u7EBF</span>\u3001<span style=\"text-decoration: line-through;\">\u5220\u9664\u7EBF</span>\u3001\u6587\u5B57<span style=\"color: rgb(0, 176, 240);\">\u989C\u8272</span>\u3001<span style=\"background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);\">\u80CC\u666F\u8272</span>\u3001\u4EE5\u53CA\u5B57\u53F7<span style=\"font-size: 20px;\">\u5927</span><span style=\"font-size: 14px;\">\u5C0F</span>\u7B49\u7B80\u5355\u6392\u7248\u64CD\u4F5C\u3002</p>\n<p>\u8FD8\u53EF\u4EE5\u5728\u8FD9\u91CC\u52A0\u5165\u8868\u683C\u4E86</p>\n<table style=\"border-collapse: collapse; width: 100%; border: 1px solid #dddddd;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\">\u4E2D\u5956\u5BA2\u6237</td>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\">\u53D1\u653E\u5956\u54C1</td>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\">\u5907\u6CE8</td>\n</tr>\n<tr>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\">\u732A\u732A</td>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\">\u5185\u6D4B\u7801</td>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\"><em><span style=\"color: rgb(255, 0, 0);\">\u5DF2\u7ECF\u53D1\u653E</span></em></td>\n</tr>\n<tr>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\">\u5927\u9EA6</td>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\">\u79EF\u5206</td>\n<td style=\"word-break: break-all; border-width: 1px; padding: 5px; border-color: rgb(221, 221, 221);\" valign=\"top\" width=\"93\"><a draggable=\"false\" target=\"_blank\">\u9886\u53D6\u5730\u5740</a></td>\n</tr>\n</tbody>\n</table>\n<p style=\"text-align: left;\"><span style=\"text-align: left;\">\u4E5F\u53EF\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u3001\u5E76\u5BF9\u56FE\u7247\u52A0\u4E0A\u8D85\u7EA7\u94FE\u63A5\uFF0C\u65B9\u4FBF\u7528\u6237\u70B9\u51FB\u3002</span></p>";
  }
  return /*#__PURE__*/React.createElement(Component, {
    className: "taro_html taro-rich-text",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
};
RichText.displayName = 'RichText';
export default RichText;