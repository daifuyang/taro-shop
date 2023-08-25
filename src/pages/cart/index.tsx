import { View,Image } from "@tarojs/components";
import styles from "./index.module.scss";
import cartEmpty from "../../static/images/cart.png"
import { redirectTo } from "@/utils/utils";

const Cart = (props) => {
  return (
    <View className={styles.container}>
        <View className={styles.imgWrap}>
            <Image src={cartEmpty} mode="aspectFit"></Image>
        </View>
        <View className={styles.title}>购车车还是空的</View>
        <View className={styles.desc}>赶紧买点宝贝慰劳下自己吧</View>
        <View onClick={ () => {
          redirectTo({
            url: '/pages/index/index'
          })
        } } className={styles.btn}>
            去逛逛
        </View>
    </View>
  );
};
export default Cart;
