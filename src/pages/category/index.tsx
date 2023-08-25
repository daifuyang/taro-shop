import { useEffect, useState } from "react";
import { View, Input } from "@tarojs/components";
import Taro, { useDidShow, useLoad, usePullDownRefresh, useReady } from "@tarojs/taro";
import CategoryMenu from "./components/CategoryMenu";
import ProductList from "./components/ProductList";
import styles from "./index.module.scss";
import { getTreeProducts } from "@/services/product";
import {
  getBoundingClientRectAllAsync,
  getBoundingClientRectAsync,
  throttle,
} from "@/utils/utils";

export default function Index() {
  useDidShow(() => {});

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [defaultRect, setDefaultRect] = useState<any>({
    config: {},
  });
  const [scrollTop, setScrollTop] = useState<any>(0);
  const [categoryScrollTop, setCategoryScrollTop] = useState<any>(0);

  const { categoryPaddingBottom = 0 } = defaultRect?.config;

  useEffect(() => {
    fetchProducts();
  }, []);

  usePullDownRefresh(() => {
    fetchProducts({pullDown:true});
  })

  useEffect(() => {
    if (categories.length > 0) {
      fetchQuery(true);
    }
  }, [categories]);

  const fetchProducts = async (options:any = {}) => {
    const {pullDown = false} = options
    const res: any = await getTreeProducts();
    if (res.code === 1) {
      if (res.data?.length > 0) {
        setCategories(res.data);
        setSelectedCategory(res.data[0].category?.productCategoryId);
      }
    }else {
      Taro.showToast({
        title: res.msg,
        icon: "error",
        duration: 2000,
      });
    }
    if(pullDown) {
      Taro.stopPullDownRefresh()
    }
   
  };

  const fetchQuery = async (init = false) => {
    const rectMap: any = {
      config: {},
    };

    // 构造左侧dom数据
    if (init) {
      // 搜索
      const searchRect = await getBoundingClientRectAsync("#search-wrap");
      rectMap["search"] = searchRect;

      // 分类容器
      const categoryListRect = await getBoundingClientRectAsync(
        "#category-list"
      );
      rectMap["category"] = categoryListRect;

      // 分类列表
      let moreOnePage = false;
      let categoryItemHeight = 0;
      const categoryHeight = rectMap["category"]?.height;

      const categoryItemAllRect: any = await getBoundingClientRectAllAsync(
        ".category-item"
      );

      for (let index = 0; index < categoryItemAllRect.length; index++) {
        const rect = categoryItemAllRect[index];
        rectMap[rect.id] = rect;
        if (index == 1) {
          categoryItemHeight =
            categoryItemAllRect[1].top - categoryItemAllRect[0].top;
        }
        if (rect.top > categoryHeight) {
          moreOnePage = true;
        }
      }

      if (moreOnePage) {
        const categoryPaddingBottom = categoryHeight - categoryItemHeight * 8;
        rectMap["config"].categoryItemHeight = categoryItemHeight;
        rectMap["config"].categoryPaddingBottom = Math.round(
          categoryPaddingBottom
        );
      }
    }
    const productItemCategoryAllRect: any = await getBoundingClientRectAllAsync(
      ".product-item-category"
    );
    if (init) {
      for (let index = 0; index < productItemCategoryAllRect.length; index++) {
        const rect = productItemCategoryAllRect[index];
        rectMap[rect.id] = rect;
      }
      setDefaultRect(rectMap);
      return;
    }

    let id: any = "";
    for (let index = 0; index < productItemCategoryAllRect.length; index++) {
      const rect = productItemCategoryAllRect[index];
      const topHeight =
        defaultRect["search"]?.top + defaultRect["search"]?.bottom;
      const currentHeight = rect?.top - topHeight;
      if (currentHeight <= 10) {
        const regex = /product-item-category-(\d+)/;
        const str = rect?.id;
        const matchResult = str.match(regex);
        if (matchResult && matchResult[1]) {
          id = matchResult[1];
          if (id) {
            id = Number(id);
          }
        }
      }
    }

    const categoryId = `category-item-${id}`;
    const rect = defaultRect[categoryId];

    const categoryHeight = defaultRect["category"].height;
    const searchHeight = defaultRect["search"].height;

    const categoryItemRect = rect.bottom - searchHeight;
    if (categoryItemRect >= categoryHeight) {
      // 滚动页面
      setCategoryScrollTop(categoryItemRect);
    } else {
      setCategoryScrollTop(0);
    }

    if (id && selectedCategory !== id) {
      setSelectedCategory(id);
    }
  };

  const onCategoryScroll = throttle((e) => {
    const { scrollTop } = e.detail;
    if (process.env.TARO_ENV === "h5") {
      setCategoryScrollTop(scrollTop);
    }
  }, 50);

  const onProductScroll = throttle((e) => {
    const { scrollTop } = e.detail;
    if (process.env.TARO_ENV === "h5") {
      setScrollTop(scrollTop);
    }
    fetchQuery();
  }, 50);

  function handleSelectCategory(mainCategoryId) {
    if (selectedCategory !== mainCategoryId) {
      setSelectedCategory(mainCategoryId);
      const id = `product-item-category-${mainCategoryId}`;
      const searchHeight =
        defaultRect["search"].top + defaultRect["search"].bottom;
      const scrollTop = defaultRect[id].top - searchHeight;
      console.log("handleSelectCategory", scrollTop);
      setScrollTop(Math.ceil(scrollTop));
    }
  }

  return (
    <View className={styles.container}>
      <View id="search-wrap" className={styles.searchWrap}>
        <View className={styles.search}>搜索商品</View>
      </View>

      <View className={styles.main}>
        {/* 分类菜单组件 */}
        <CategoryMenu
          scrollTop={categoryScrollTop}
          onScroll={onCategoryScroll}
          categories={categories}
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
          categoryPaddingBottom={categoryPaddingBottom}
        />

        {/* 商品列表组件 */}
        <ProductList
          scrollTop={scrollTop}
          onProductScroll={onProductScroll}
          products={categories}
        />
      </View>
    </View>
  );
}
