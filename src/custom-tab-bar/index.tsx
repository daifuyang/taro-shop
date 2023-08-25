import { useEffect } from "react";
import Tabbar from "@/components/tabbar";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { setTabbarActive } from "@/redux/reducers/common";
import Taro from "@tarojs/taro";
import "./index.scss";

const MyTabbar = () => {
  const config = useAppSelector((s) => s.common.tabbar);
  const dispatch = useDispatch();

  useEffect(() => {
    const pages = Taro.getCurrentPages(); //获取加载的页面
    const currentPage = pages[pages.length - 1]; //获取当前页面的对象
    const url = currentPage?.route; //当前页面url
    const { list = [] } = config;
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      const { pagePath } = item;
      let currentPath = "/" + url?.split("?")[0]
      if (pagePath === currentPath) {
        dispatch(setTabbarActive(index));
        return;
      }
    }
  }, []);

  return (
    <Tabbar
      onChange={(index) => {
        dispatch(setTabbarActive(index));
      }}
      {...config}
    />
  );
};

export default MyTabbar;
