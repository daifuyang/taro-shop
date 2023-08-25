const config = defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/product/list',
    'pages/product/detail',
    'pages/cart/index',
    'pages/mine/index'
  ],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '商城系统',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    list: [
      {
        iconPath: "static/images/tabbar/home.png",
        selectedIconPath: "static/images/tabbar/home-fill.png",
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        iconPath: "static/images/tabbar/category.png",
        selectedIconPath: "static/images/tabbar/category-fill.png",
        pagePath: "pages/category/index",
        text: "分类",
      },
      {
        iconPath: "static/images/tabbar/cart.png",
        selectedIconPath: "static/images/tabbar/cart-fill.png",
        pagePath: "pages/cart/index",
        text: "购物车",
      },
      {
        iconPath: "static/images/tabbar/mine.png",
        selectedIconPath: "static/images/tabbar/mine-fill.png",
        pagePath: "pages/mine/index",
        text: "我的",
      },
    ],
    custom: true,
    color: "#666666",
    selectedColor: "#1A1A1A",
    backgroundColor: "#ffffff",
  },
})

if (process.env.TARO_ENV === 'h5') {
  config.tabBar.list = []
}


export default config