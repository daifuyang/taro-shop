import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";
import { setTabbarActive } from "@/redux/reducers/common";

function Index(props: any) {

  const { list = [], onChange, active = 0 } = props;
  const [color, setColor] = useState("#000000");
  const [selectedColor, setSelectedColor] = useState("#DC143C");

  const switchTab = (index, url) => {
    if (onChange) {
      onChange(index);
    }
    Taro.switchTab({ url });
  };

  return (
    <View className="tab-bar">
      <View className="tab-bar-border"></View>
      {list.map((item, index) => {
        return (
          <View
            key={index}
            className="tab-bar-item"
            onClick={() => switchTab(index, item.pagePath)}
          >
            <Image
              className="image"
              src={active === index ? item.selectedIconPath : item.iconPath}
            />
            <View className="text" style={{ color: active === index ? selectedColor : color }}>
              {item.text}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default Index;
