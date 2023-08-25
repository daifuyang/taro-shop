import { Divider, Empty, Popup } from "@nutui/nutui-react-taro";
import { View, Swiper, Image, Text, SwiperItem } from "@tarojs/components";
import { Shop, Cart } from "@nutui/icons-react-taro";
import styles from "./detail.module.scss";
import { showProduct } from "@/services/product";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import { redirectTo } from "@/utils/utils";
import config from "@/config";
import Taro from "@tarojs/taro";

const Detail = () => {
  const [data, setData] = useState<any>({});
  const [id, setId] = useState(0);
  const [showBottom, setShowBottom] = useState(false);
  const [width, setWidth] = useState(0);

  const fetchData = async (id) => {
    setId(id);
    const res = await showProduct(id);
    if (res.code === 1) {
      setData(res.data);
      return;
    }
    setId(0);
  };

  useLoad((options) => {
    const { id } = options;
    if (id > 0) {
      fetchData(id);
    }
  });

  useLoad(() => {
    const res = Taro.getSystemInfoSync();
    setWidth(res.windowWidth)
  });

  if (!id) {
    return <Empty description="无数据" />;
  }

  const { priceNegotiable = 0, attributes = [], productThumbnail = [] } = data;

  // let mainThumbnail = "";

  // if (productThumbnail?.length > 0) {
  //   mainThumbnail = productThumbnail[0] && config.assetsURL + productThumbnail[0];
  // }

  const skuKeys = attributes?.map((item) => {
    return item.name;
  });

  let priceRender = (
    <View className={styles.priceWrap}>
      <View className={styles.unit}>￥</View>
      <View className={styles.price}>{data.price}</View>
    </View>
  );

  if (priceNegotiable == 1) {
    priceRender = <View className={styles.priceWrap}>价格面议</View>;
  }

  let footerBtn = (
    <View className={styles.btnWrap}>
      <View className={`${styles.btn} ${styles.addToCart}`}>加入购物车</View>
      <View className={`${styles.btn} ${styles.buy}`}>立即购买</View>
    </View>
  );

  if (priceNegotiable == 1) {
    footerBtn = (
      <View className={styles.btnWrap}>
        <View className={`${styles.btn} ${styles.contact}`}>联系客服</View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        {productThumbnail?.length > 0 ? (
          <Swiper style={{height:width}} className={styles.swiper}>
            {productThumbnail.map((thumbnail, i) => {
              const src = thumbnail && config.assetsURL + thumbnail;
              return (
                <SwiperItem key={i}>
                  <Image className={styles.image} src={src} mode="widthFix"></Image>
                </SwiperItem>
              );
            })}
          </Swiper>
        ) : (
          <View className={styles.emptyThumbnail}>
            <Text className={styles.tips}>暂无图片</Text>
          </View>
        )}
      </View>
      <View className={styles.card}>
        {priceRender}
        <View className={styles.titleWrap}>
          <View className={styles.title}>{data?.productName || "默认名称"}</View>
        </View>
      </View>
      <View className={styles.card}>
        <View className={styles.expressWrap}>
          <View className={styles.express}>
            {/* <View className={styles.label}>运费</View>
            <View className={styles.value}>￥0.00-18.00</View> */}
          </View>
          <View className={styles.salesWrap}>
            <View className={styles.sales}>已售：{data.sales || 0}</View>
            <Divider direction="vertical" />
            {/* <View className={styles.stock}>剩余：0</View> */}
          </View>
        </View>
      </View>
      {skuKeys?.length > 0 && (
        <View className={styles.card}>
          <View className={styles.attribute}>
            <View className={styles.label}>选择</View>
            <View
              onClick={() => {
                setShowBottom(true);
              }}
              className={styles.value}
            >
              {skuKeys.join(",")}
            </View>
            <Popup
              visible={showBottom}
              style={{ height: "60%" }}
              position="bottom"
              onClose={() => {
                setShowBottom(false);
              }}
            >
              {attributes.map((item, i) => {
                const { items = [] } = item;
                return (
                  <View key={i} className={styles.skuContainer}>
                    <View className={styles.skuThumb}></View>
                    <View className={styles.skuWrap}>
                      <View className={styles.skuName}>{item.name}</View>
                      <View className={styles.skuItems}>
                        {items?.map((child, ci) => {
                          return (
                            <View className={styles.skuItemName} key={`${i}-${ci}`}>
                              {child.name}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                );
              })}
            </Popup>
          </View>
        </View>
      )}

      <View className={styles.footer}>
        <View className={styles.footerWrap}>
          <View
            onClick={() => {
              redirectTo({
                url: "/pages/index/index"
              });
            }}
            className={styles.iconWrap}
          >
            <Shop className={styles.icon} />
            <View className={styles.label}>首页</View>
          </View>
          <View
            onClick={() => {
              redirectTo({
                url: "/pages/cart/index"
              });
            }}
            className={styles.iconWrap}
          >
            <Cart className={styles.icon} />
            <View className={styles.label}>购物车</View>
          </View>
          {footerBtn}
        </View>
      </View>
    </View>
  );
};

export default Detail;
