import { View,Text } from "@tarojs/components";
import type { ProductFeed } from "../productFeed";
import config from "@/config"
import empty from '@/static/images/product/empty.jpg'
import styles from "./card.module.scss";

const Card = (props: ProductFeed) => {
  const { data = [],onClick = null } = props;
  return (
    <View className={styles.cardContainer}>
      <View className={styles.cardList}>
        {data.map((item) => {
          const {productThumbnail} = item
          const src = productThumbnail?.length > 0 ? config.assetsURL + productThumbnail[0] : empty

          return (
            <View onClick={ () => {
              if(onClick) {
                onClick(item.productId)
              }
            } } key={item.productId} className={styles.col6}>
              <View className={styles.cardItem}>
                <View className={styles.imgWrap}>
                  <View
                    style={{
                      backgroundImage:
                        `url(${(src)})`
                    }}
                    className={styles.img}
                  ></View>
                </View>
                <View className={styles.cardContent}>
                  <View className={styles.productName}>{item.productName}</View>
                  <View className={styles.sales}>已售：{item.sales}</View>
                  <View className={styles.priceWrap}>
                    <View className={styles.price}>￥{item.price}</View>
                    <View className={styles.addToCart}>
                        <Text className={`${styles.icon} iconfont icon-cart`}/>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default Card;
