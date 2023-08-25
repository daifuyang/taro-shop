import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: {
      theme: "default",
      mainPage: "",
      color: {
        primaryColor: "1890ff"
      }
    },
    tabbar: {
      active: 0,
      color: "#666666",
      selectedColor: "#1A1A1A",
      list: [
        {
          iconPath: "/static/images/tabbar/home.png",
          selectedIconPath: "/static/images/tabbar/home-fill.png",
          pagePath: "/pages/index/index",
          text: "首页"
        },
        {
          iconPath: "/static/images/tabbar/category.png",
          selectedIconPath: "/static/images/tabbar/category-fill.png",
          pagePath: "/pages/category/index",
          text: "分类"
        },
        {
          iconPath: "/static/images/tabbar/cart.png",
          selectedIconPath: "/static/images/tabbar/cart-fill.png",
          pagePath: "/pages/cart/index",
          text: "购物车"
        },
        {
          iconPath: "/static/images/tabbar/mine.png",
          selectedIconPath: "/static/images/tabbar/mine-fill.png",
          pagePath: "/pages/mine/index",
          text: "我的"
        }
      ]
    }
  },
  reducers: {
    setCommonState: (state, action: any) => {
      return { ...state, ...action.payload };
    },
    setTabbarActive: (state, action) => {
      state.tabbar.active = action.payload;
    }
  }
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setCommonState, setTabbarActive } = commonSlice.actions;

export default commonSlice.reducer;
