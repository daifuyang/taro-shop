import Taro, { useLoad, usePullDownRefresh } from "@tarojs/taro";
import Tabbar from "../../h5-tab-bar";
import TaroRender from "../../components/taroRender";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { getPage } from "@/services/themePage";
import style from "./index.module.scss";
import SafeArea from "@/components/safeArea/safeArea";
import { Skeleton } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const theme = useAppSelector((s) => s.common.theme);
  const [schema, setSchema] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSchema = (data) => {
    if (data.schema) {
      const newSchema = JSON.parse(data.schema);
      return newSchema;
    }
    return [];
  };

  const fetchData = async (options: any = {}) => {
    if (theme.mainPage) {
      const { pullDown } = options;
      const cache: any = init();
      setLoading(true);
      const res = await getPage(theme.mainPage);
      if (res.code === 1) {
        // 如果缓存的id不等于接口的或者updatedAt大于本地的则跟新
        const { data = {} } = res;
        if (data.updateAt !== cache.updateAt) {
          // 先存本地localStorage
          try {
            Taro.setStorageSync("home", JSON.stringify(data));
          } catch (error) {}
          const newSchema = getSchema(data);
          setSchema(newSchema?.componentsTree);
        }
      } else {
        Taro.showToast({
          title: res.msg,
          icon: "error",
          duration: 2000
        });
      }

      setLoading(false);

      if (pullDown) {
        Taro.stopPullDownRefresh();
      }
    }
  };

  const init = () => {
    // 先读本地
    let json = {};
    try {
      const cache = Taro.getStorageSync("home");
      json = JSON.parse(cache);
      const newSchema = getSchema(json);
      setSchema(newSchema?.componentsTree);
    } catch (error) {}
    return json;
  };

  useEffect(() => {
    fetchData();
  }, [theme.mainPage]);

  usePullDownRefresh(() => {
    fetchData({ pullDown: true });
  });

  const render = () => {
    if (loading) {
      return <Skeleton rows={8} title animated />;
    }

    return (
      <>
        <TaroRender className={style.render} schema={schema} />
        <SafeArea />
        {process.env.TARO_ENV === "h5" && <Tabbar />}
      </>
    );
  };

  return <View>{render()}</View>;
}
