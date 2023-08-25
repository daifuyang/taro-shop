module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    devServer: {
      proxy: {
        "/api": {
          //接口访问路径
          target: "http://192.168.2.100:9080", // 服务端域名
          // target: "http://lowcode.zerocms.cn", // 服务端域名
          changeOrigin: true
        },
        "/public": {
          //接口访问路径
          target: "http://192.168.2.100:9080", // 服务端域名
          changeOrigin: true
        }
      }
    }
  }
};
