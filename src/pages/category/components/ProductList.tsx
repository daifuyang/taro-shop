import { ScrollView, View, Image } from "@tarojs/components";
import styles from "./productList.module.scss";
import Taro from "@tarojs/taro";
import empty from '@/static/images/product/empty.jpg'
import config from '@/config'
import { getProductEmpty } from "@/utils/utils";

function ProductList({ products, onProductScroll, scrollTop }) {
  const getPrice = (item) => {
    const { price, priceNegotiable } = item;
    if (priceNegotiable) {
      return <View className={styles.negotiable}>价格面议</View>;
    }
    return <View className={styles.price}>￥{price}</View>;
  };

  return (
    <ScrollView
      scrollTop={scrollTop}
      enablePassive="true"
      onScroll={onProductScroll}
      showScrollbar={false}
      className={`${styles.container}`}
      scrollY
      scrollWithAnimation
      scrollAnimationDuration="200"
    >
      {/* 右侧商品列表 */}
      {products.map((item) => {
        const { category, data } = item;
        const { productCategoryId } = category;

        const product = data?.map((product) => {
          const showCart = product?.priceNegotiable !== 1;

          const mainSrc = getProductEmpty(product,config.assetsURL)
          
          return (
            <View
              onClick={() => {
                Taro.navigateTo({
                  url:`/pages/product/detail?id=${product.productId}`
                })
              }}
              key={`${productCategoryId}-${product.productId}`}
              className={styles.productItem}
            >
              {/* 显示商品信息 */}
              <View className={styles.productMeta}>
                <Image
                  mode="aspectFit"
                  src={mainSrc}
                />
              </View>
              <View className={styles.productContent}>
                <View className={styles.text}>
                  <View className={styles.productName}>{product?.productName || "未命名"}</View>
                  <View className={styles.sales}>已售：{product?.sales || 0}</View>
                </View>
                <View className={styles.priceWrap}>
                  {getPrice(product)}
                  {showCart && <View className={styles.addCard}>+</View>}
                </View>
              </View>
            </View>
          );
        });

        return (
          <View key={productCategoryId} className={styles.productItemWrap}>
            <View
              data-id={category.productCategoryId}
              id={`product-item-category-${category.productCategoryId}`}
              className={`${styles.categoryName} product-item-category`}
            >
              {category.categoryName}
            </View>
            {product}
          </View>
        );
      })}
    </ScrollView>
  );
}

export default ProductList;
