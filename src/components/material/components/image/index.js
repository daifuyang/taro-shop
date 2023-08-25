import * as React from 'react';
import Image from "./image";
var Index = function Index(props) {
  var type = props.type;
  if (type === "vertical") {
    return /*#__PURE__*/React.createElement(Image, props);
  }
  return /*#__PURE__*/React.createElement("div", null, "Image");
};
export default Index;