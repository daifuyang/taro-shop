import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "@nutui/nutui-react-taro/dist/style.css";
import "./app.scss";
import "./styles/iconfont.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import Taro from "@tarojs/taro";
import { wxLogin } from "@/utils/wxUtil";
import { login } from "@/services/login";
import { setUserInfo } from "./redux/reducers/user";
import config from "@/config";
import { getSetting } from "@/services/settings";
import { setCommonState } from "@/redux/reducers/common";

function App({ children }: PropsWithChildren) {
  useLaunch(async () => {
    let wei: any = {};
    if (process.env.TARO_ENV === "weapp") {
      let userInfo: any = {};
      try {
        var value = Taro.getStorageSync("userInfo");
        if (value) {
          userInfo = JSON.parse(value);
        }
      } catch (e) {
        // Do something when catch error
      }
      if (!userInfo.openId) {
        const wxRes: any = await wxLogin();
        if (wxRes.code) {
          const res = await login({ jsCode: wxRes.code });
          if (res.code === 1) {
            userInfo = {
              openId: res.data.openid
            };
            Taro.setStorage({
              key: "userInfo",
              data: JSON.stringify(userInfo)
            });
          }
        }
      }
      store.dispatch(setUserInfo(userInfo));
    } else {
      let userInfo: any = {
        openId: config.openId
      };
      store.dispatch(setUserInfo(userInfo));
    }

    try {
      var weiVal = Taro.getStorageSync("wei");
      if (weiVal) {
        wei = JSON.parse(weiVal);
      }
    } catch (error) {}

    const weiRes = await getSetting();
    if (weiRes.code === 1) {
      const state = store.getState();
      const { theme } = state.common;
      store.dispatch(setCommonState({ theme: { ...theme, ...weiRes.data } }));
    }
  });

  // children 是将要会渲染的页面
  return (
    <Provider store={store}>
      <>{children}</>
    </Provider>
  );
}

export default App;
