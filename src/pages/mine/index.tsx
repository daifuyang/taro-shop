import { useAppSelector } from "@/redux/hook";
import { Text, View, Image, Button } from "@tarojs/components";
import Taro, { useLoad, useDidShow } from "@tarojs/taro";
import { Grid } from "@nutui/nutui-react-taro";
import { ArrowRight, IconFont } from "@nutui/icons-react-taro";
import bg from "../../static/images/mine/mine-header.png";
import styles from "./index.module.scss";

function Mine() {
  useDidShow(() => {});
  const userInfo = useAppSelector((s) => s.user.userInfo);
  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Image mode="scaleToFill" src={bg} />
      </View>
      <View className={styles.uerInfoCard}>
        <View className={styles.userInfo}>
          <View className={styles.avatar}></View>
          <View className={styles.content}>
            <View className={styles.nickname}>用户您好</View>
            <View className={styles.desc}>为给你提供更好的服务请授权登录</View>
          </View>
          <View className={styles.btnWrap}>
            <Button className={styles.btn}>登录/注册</Button>
          </View>
        </View>
      </View>

      <View className={styles.main}>
        <View className={styles.menu}>
          <Grid
            style={{
              "--nutui-grid-border-color": "transpoart",
              "--nutui-grid-item-content-padding": "16px 0"
            }}
            columns={4}
          >
            <Grid.Item text="余额">
              <Text className={`${styles.value}`}>0.00</Text>
            </Grid.Item>
            <Grid.Item text="积分">
              <Text className={`${styles.value}`}>0</Text>
            </Grid.Item>
            <Grid.Item text="优惠券">
              <Text className={`${styles.value}`}>0</Text>
            </Grid.Item>
            <Grid.Item text="卡包">
              <Text className={`${styles.value}`}>0</Text>
            </Grid.Item>
          </Grid>
        </View>

        <View className={styles.order}>
          <View className={styles.titleWrap}>
            <View className={styles.title}>我的订单</View>
            <View className={styles.more}>
              查看全部订单
              <ArrowRight size={12} />
            </View>
          </View>

          <Grid
            style={{
              "--nutui-grid-border-color": "transpoart",
              "--nutui-grid-item-content-padding": "16px 0"
            }}
            columns={5}
          >
            <Grid.Item text="待付款">
              <Text className={`iconfont icon-31daifukuan ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="待发货">
              <Text className={`iconfont icon-31daifahuo ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="待收货">
              <Text className={`iconfont icon-31daishouhuo ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="已完成">
              <Text className={`iconfont icon-quanbudingdan ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="退款/售后">
              <Text className={`iconfont icon-tuikuantuihuo ${styles.icon}`} />
            </Grid.Item>
          </Grid>
        </View>

        <View className={styles.other}>
         
          <Grid
            style={{
              "--nutui-grid-border-color": "transpoart",
              "--nutui-grid-item-content-padding": "16px 0"
            }}
            columns={4}
          >
            <Grid.Item text="客服聊天">
              <Text className={`iconfont icon-kefu ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="购物车">
              <Text className={`iconfont icon-31gouwuche ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="收货地址">
              <Text className={`iconfont icon-31dingwei ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="个人信息">
              <Text className={`iconfont icon-31wode ${styles.icon}`} />
            </Grid.Item>
            <Grid.Item text="商家电话">
              <Text className={`iconfont icon-31dianhua ${styles.icon}`} />
            </Grid.Item>
          </Grid>
        </View>
      </View>
    </View>
  );
}

export default Mine
