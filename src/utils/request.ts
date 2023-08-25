import axios from "axios";
import config from "@/config";
import Taro from "@tarojs/taro";

let baseURL = config?.baseURL || "";

if (process.env.TARO_ENV === "h5") {
  baseURL = "";
}

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (conf) => {

    let appId = ""

    if(config.debug) {
      appId = config.appId
    }

    if (process.env.TARO_ENV === "weapp") {
      const accountInfo = Taro.getAccountInfoSync();
      appId = accountInfo.miniProgram.appId;
    }

    if (conf.params) {
      conf.params.appId = appId;
    } else {
      conf.params = {
        appId,
      };
    }

  /*   // 获取站点id
    const siteId = "1734133558";
    // 检查 config.params 是否存在
    if (config.params) {
      config.params.siteId = siteId;
    } else {
      config.params = {
        siteId,
      };
    } */
    return conf;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

const request = async (url, options = {}) => {
  try {
    const response = await instance.request({
      url,
      ...options,
    });

    // 返回响应数据
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { request };
