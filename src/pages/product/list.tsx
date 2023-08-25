import { useEffect, useState } from "react";
import { getProducts } from "@/services/product";
import FilterBar from "@/components/filterBar";
import ProductFeed from "@/components/productFeed";
import Search from "@/components/search";
import { View } from "@tarojs/components";
import styles from "./list.module.scss";
import {redirectTo} from "@/utils/utils"
import Taro, { useLoad, usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { Divider, Empty } from "@nutui/nutui-react-taro";
import SafeArea from "@/components/safeArea";

const Index = (props) => {
  const [list, setList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  useLoad((options) => {
    const { categoryId } = options;
    setCategoryId(categoryId);
  });

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  useReachBottom(() => {
    if (hasMore) {
      fetchData();
    }
  });

  const fetchData = async (params: any = {}) => {
    const { pullRefresh } = params;
    let _params = { ...params, categoryId, current, pageSize };
    const res = await getProducts(_params);
    Taro.showLoading({
      title: "加载中..."
    });
    if (res.code === 1) {
      const { data } = res;
      const currentTotal = data.current * data.pageSize;
      if (currentTotal >= data.total) {
        setHasMore(false);
      } else {
        setCurrent(data.current + 1);
        setPageSize(data.pageSize);
        const _list = [...list];
        _list.push(...data.data);
        setList(_list);
      }
    } else {
      Taro.showToast({
        title: res.msg,
        icon: "error"
      });
    }

    Taro.hideLoading();

    if (pullRefresh) {
      Taro.stopPullDownRefresh();
    }
  };

  usePullDownRefresh(() => {
    fetchData({ productCategory: categoryId, pullRefresh: true });
  });

  let render = <ProductFeed onClick={ (id) => {
    redirectTo({
      url:`/pages/product/detail?id=${id}`
    })
  } } data={list} />;

  if (list.length === 0) {
    render = <Empty />;
  }

  return (
    <View className={styles.container}>
      <View className={styles.fixed}>
        <View className={styles.search}>
          <Search />
        </View>
        <View className={styles.filterBar}>
          <FilterBar />
        </View>
      </View>
      <View className={styles.searchWrap}>
        <View className={styles.search}>
          <Search />
        </View>
        <View className={styles.filterBar}>
          <FilterBar />
        </View>
      </View>
      <View className={styles.content}>{render}</View>
      <View className={styles.contentEnd}>{hasMore ? "加载中..." : "没有更多了~"}</View>
      <SafeArea />
    </View>
  );
};
export default Index;
