const path = require("path");

const config = {
  projectName: "shop",
  date: "2023-8-3",
  designWidth(input) {
    // 配置 NutUI 375 尺寸
    if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
      return 375;
    }
    // 全局使用 Taro 默认的 750 尺寸
    return 375;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: ["@tarojs/plugin-html", "@tarojs/plugin-http"],
  defineConstants: {},
  alias: {
    "@/static": path.resolve(__dirname, "..", "src/static"),
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/services": path.resolve(__dirname, "..", "src/services"),
    "@/redux": path.resolve(__dirname, "..", "src/redux"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/config": path.resolve(__dirname, "..", "src/config.ts")
  },
  copy: {
    patterns: [],
    options: {}
  },
  sass: {
    resource: [
      path.resolve(__dirname, "..", "src/styles/variable.scss"),
      path.resolve(__dirname, "..", "src/styles/style.scss")
    ]
  },
  framework: "react",
  compiler: {
    type: "webpack5",
    prebundle: {
      enable: false
    }
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ["nut-"]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    // esnextModules: ['nutui-react'],
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ["nut-"]
        }
      },
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
