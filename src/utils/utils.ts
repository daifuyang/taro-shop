import Taro from "@tarojs/taro";
import empty from "@/static/images/product/empty.jpg";
import store from "@/redux/store";
import { setTabbarActive } from "@/redux/reducers/common";

export const throttle = (callback, delay) => {
  let lastExecTime = 0;
  return (...args) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime >= delay) {
      lastExecTime = currentTime;
      callback(...args);
    }
  };
};

type Timer = ReturnType<typeof setTimeout>;

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: Timer | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timer as Timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function getBoundingClientRectAllAsync(select: string) {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .selectAll(select) // 替换为你要获取的元素的选择器
      .boundingClientRect((rects) => {
        resolve(rects);
      })
      .exec();
  });
}

export function getBoundingClientRectAsync(select: string) {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .select(select) // 替换为你要获取的元素的选择器
      .boundingClientRect((rect) => {
        resolve(rect);
      })
      .exec();
  });
}

// 统一处理小程序的行为跳转
export function actionTo(item) {
  if (item) {
    const { key, data } = item;
    switch (key) {
      case "productDetail":
        redirectTo({ url: `/pages/product/detail?id=${data.id}` });
        break;
      case "productAll":
        redirectTo({ url: `/pages/product/list` });
        break;
      case "productCategory":
        redirectTo({ url: `/pages/product/list?categoryId=${data.id}` });
        break;
    }
  }
}

export function redirectTo({ url }) {
  // tabBarConfig 包含了所有 tabbar 菜单的配置
  const state = store.getState()
  const tabbar = state.common.tabbar.list
  for (let index = 0; index < tabbar.length; index++) {
    const item = tabbar[index];
    if(item.pagePath === url.split('?')[0]) {
      store.dispatch(setTabbarActive(index))
      Taro.switchTab({
        url
      })
      return
    }
  }
  Taro.navigateTo({
    url
  });
}

export function getProductEmpty(product, assetsURL) {
  let mainSrc = empty;
  const { productThumbnail = [] } = product;
  if (productThumbnail?.length > 0) {
    mainSrc = productThumbnail && assetsURL + productThumbnail[0];
  }
  return mainSrc;
}
