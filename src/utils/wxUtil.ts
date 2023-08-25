import Taro from "@tarojs/taro";

export function wxLogin() {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}
