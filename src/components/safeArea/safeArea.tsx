import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import styles from "./safeArea.module.scss";

const SafeArea = (props) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (process.env.TARO_ENV !== "h5") {
      const windowInfo: any = Taro.getWindowInfo();
      var bottomSafeDistance = windowInfo.windowHeight - windowInfo.safeArea.bottom;
      if (bottomSafeDistance) {
        setHeight(bottomSafeDistance);
      }
    }
  }, []);

  return <View className={styles.area} style={{ height }}></View>;
};
export default SafeArea;
