import _extends from "@babel/runtime/helpers/extends";
import React, { createContext, useState } from 'react';
export var ConfigContext = /*#__PURE__*/createContext({
  productListAction: null,
  productCategoryListAction: null,
  assetsURL: '',
  actionTo: null
});
var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
    _ref$config = _ref.config,
    config = _ref$config === void 0 ? {} : _ref$config;
  var _useState = useState(config),
    currentConfig = _useState[0],
    setCurrentConfig = _useState[1];
  var updateConfig = function updateConfig(newConfig) {
    setCurrentConfig(function (prevConfig) {
      return _extends({}, prevConfig, newConfig);
    });
  };
  return /*#__PURE__*/React.createElement(ConfigContext.Provider, {
    value: {
      config: currentConfig,
      updateConfig: updateConfig
    }
  }, children);
};
export default ConfigProvider;