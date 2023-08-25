// components/CategoryMenu.jsx
import { View, ScrollView } from "@tarojs/components";
import styles from "./categoryMenu.module.scss";

function CategoryMenu({
  categories,
  onSelectCategory,
  selectedCategory,
  scrollTop,
  onScroll,
  categoryPaddingBottom,
}) {
  function handleMainCategoryClick(mainCategoryId) {
    onSelectCategory(mainCategoryId);
  }

  return (
    <ScrollView
      scrollTop={scrollTop}
      onScroll={onScroll}
      id="category-list"
      showScrollbar={false}
      enablePassive="true"
      className={styles.category}
      scrollY
      scrollWithAnimation
      scrollAnimationDuration="200"
    >
      <>
        {categories.map((item: any = {}) => {
          const { category } = item;
          return (
            <View
              key={category.productCategoryId}
              id={`category-item-${category.productCategoryId}`}
              className={`${styles.categoryItem} category-item ${
                selectedCategory === category.productCategoryId
                  ? ` ${styles.active}`
                  : ""
              }`}
              onClick={() =>
                handleMainCategoryClick(category.productCategoryId)
              }
            >
              {category.categoryName}
            </View>
          );
        })}
        {categoryPaddingBottom > 0 && <View style={{
          paddingBottom:categoryPaddingBottom
        }}></View>}
      </>
    </ScrollView>
  );
}

export default CategoryMenu;
