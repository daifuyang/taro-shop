import { View } from "@tarojs/components";
import { useState } from "react";
import "./index.scss";

interface FilterBarProps {
  defaultValue?: string;
}

const data = ["综合", "销量", "价格", "上新"];

const FilterBar = (props: FilterBarProps) => {
  const {defaultValue = 0} = props;

  const [active, setActive] = useState(defaultValue);

  return (
    <View className="filter-bar-wrap">
      {data.map((item,i) => {
        return <View onClick={() => {
            setActive(i)
        }} key={i} className={`filter-bar-wrap-item ${i === active ? 'active' : ''}`}>
            {item}
            { i === 2 && <View className="filter-bar-sort-icon">
                <View className="filter-bar-sort-icon-up"></View>
                <View className="filter-bar-sort-icon-down"></View>
            </View>}
            </View>
      })}
    </View>
  );
};
export default FilterBar;
