import * as React from 'react';
import { useContext } from 'react';
import { View, Text } from '@tarojs/components';
import empty from "./empty.jpg";
import styles from "./card.module.scss";
import { ConfigContext } from "../../ConfigContext";
var Card = function Card(props) {
  var _props$products = props.products,
    products = _props$products === void 0 ? [] : _props$products,
    __designMode = props.__designMode,
    _onClick = props.onClick;
  var _ref = useContext(ConfigContext) || {},
    _ref$config = _ref.config,
    config = _ref$config === void 0 ? {} : _ref$config;
  var assetsURL = config.assetsURL;
  var Div = 'div';
  var Span = 'span';
  if (__designMode !== 'design' && View) {
    Div = View;
    Span = Text;
  }
  return /*#__PURE__*/React.createElement(Div, {
    className: styles.cardContainer
  }, /*#__PURE__*/React.createElement(Div, {
    className: styles.cardList
  }, products === null || products === void 0 ? void 0 : products.map(function (item, i) {
    var _item$productThumbnai = item.productThumbnail,
      productThumbnail = _item$productThumbnai === void 0 ? [] : _item$productThumbnai;
    var mainSrc = empty;
    if (productThumbnail.length > 0) {
      mainSrc = productThumbnail[0] && assetsURL + productThumbnail[0];
    }
    var priceRender = /*#__PURE__*/React.createElement(Div, null, /*#__PURE__*/React.createElement(Div, {
      className: styles.sales
    }, "\u5DF2\u552E\uFF1A", item.sales || 0), /*#__PURE__*/React.createElement(Div, {
      className: styles.priceWrap
    }, /*#__PURE__*/React.createElement(Div, {
      className: styles.unit
    }, "\uFFE5"), /*#__PURE__*/React.createElement(Div, {
      className: styles.price
    }, item.price)));
    if (item.priceNegotiable === 1) {
      priceRender = /*#__PURE__*/React.createElement(Div, {
        className: styles.priceWrap + " " + styles.priceNegotiable
      }, "\u4EF7\u683C\u9762\u8BAE");
    }
    return /*#__PURE__*/React.createElement(Div, {
      onClick: function onClick() {
        if (_onClick) {
          _onClick(item);
        }
      },
      key: item.productId,
      className: styles.col6
    }, /*#__PURE__*/React.createElement(Div, {
      className: styles.cardItem
    }, /*#__PURE__*/React.createElement(Div, {
      className: styles.imgWrap
    }, /*#__PURE__*/React.createElement(Div, {
      style: {
        backgroundImage: "url(" + mainSrc + ")"
      },
      className: styles.img
    })), /*#__PURE__*/React.createElement(Div, {
      className: styles.cardContent
    }, /*#__PURE__*/React.createElement(Div, {
      className: styles.productName
    }, item.productName), priceRender)));
  })));
};
export default Card;