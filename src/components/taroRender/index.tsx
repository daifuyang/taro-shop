import { View } from "@tarojs/components";
import config from "@/config";
import {
  Page as Page2,
  Typography,
  RichText,
  Grid,
  Divider,
  Image,
  ProductFeed,
  ConfigProvider
} from "../material";
import { getProducts } from "@/services/product";
import Taro from "@tarojs/taro";
import { actionTo } from "@/utils/utils";

if (process.env.TARO_ENV !== "h5") {
  require("@tarojs/taro/html.css");
}

const Index = (props) => {
  let { schema = [] } = props;

  if (process.env.TARO_ENV === "weapp" && schema?.length > 0) {
    let _schema = JSON.stringify(schema);
    _schema = _schema.replaceAll(/"_BASE_URL":"[^"]*"/g, '"_BASE_URL":"' + config?.assetsURL + '"');
    schema = JSON.parse(_schema);
  }

  const components = {
    Page: function (props) {
      return (
        <Page2 {...props}>
          <ConfigProvider
            config={{
              assetsURL: config?.assetsURL,
              productListAction: async (data: any) => {
                const res: any = await getProducts(data);
                if (res.code === 1) {
                  return {
                    success: true,
                    data: res.data.data,
                    total: res.data.total,
                    message: res.msg
                  };
                }
                return {
                  success: false,
                  data: res.data,
                  message: res.msg
                };
              },
              actionTo
            }}
          >
            {props.children}
          </ConfigProvider>
        </Page2>
      );
    },
    Typography,
    RichText,
    Divider,
    Image,
    Grid,
    ProductFeed
  };

  const renderComponents = (schema) => {
    return schema?.map((item, i) => {
      const { props } = item;
      delete props.ref;
      let Component = components[item.componentName];
      if (!Component) {
        Component = function () {
          return <div>暂未实现的组件：{item.componentName}</div>;
        };
      }
      if (item.children) {
        return (
          <Component key={item.id} {...props}>
            {renderComponents(item.children)}
          </Component>
        );
      }

      if (item.componentName === "ProductFeed") {
        props.onClick = (item) => {
          Taro.navigateTo({
            url: `/pages/product/detail?id=${item.productId}`
          });
        };
      }

      return <Component key={item.id} {...props} />;
    });
  };

  return <View className="taro-render">{renderComponents(schema)}</View>;
};
export default Index;
