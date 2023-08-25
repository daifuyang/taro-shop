import _extends from "@babel/runtime/helpers/extends";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useContext, useEffect, useState } from 'react';
import { ConfigContext } from "../ConfigContext";
import Card from "./components/card";
import List from "./components/card";
var Index = function Index(props) {
  var __designMode = props.__designMode,
    _props$value = props.value,
    value = _props$value === void 0 ? {} : _props$value,
    onClick = props.onClick;
  var _useState = useState([]),
    products = _useState[0],
    setProducts = _useState[1];
  var _ref = useContext(ConfigContext) || {},
    _ref$config = _ref.config,
    config = _ref$config === void 0 ? {} : _ref$config;
  var productListAction = config.productListAction;
  if (__designMode === 'design') {
    productListAction = window.top.productListAction;
  }
  var fetchData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
      var res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (params === void 0) {
              params = {};
            }
            if (!productListAction) {
              _context.next = 6;
              break;
            }
            _context.next = 4;
            return productListAction(params);
          case 4:
            res = _context.sent;
            if (res.success) {
              setProducts(res.data);
            }
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function fetchData(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  useEffect(function () {
    var type = value.type,
      data = value.data;
    var params = {};
    if (type === 'category' && data.length > 0) {
      params.category = data[0].id;
    }
    fetchData(params);
  }, []);
  var _props$col = props.col,
    col = _props$col === void 0 ? 2 : _props$col;
  if (col == 2) {
    return /*#__PURE__*/React.createElement(Card, _extends({
      products: products
    }, props));
  }
  return /*#__PURE__*/React.createElement(List, props);
};
export default Index;