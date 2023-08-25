import { Search as SearchIcon } from "@nutui/icons-react-taro";
import { View,Text } from "@tarojs/components";
import "./index.scss";
const Search = (props) => {
  return (
    <View className="search-wrap">
      <View className="search"> <SearchIcon size={12}/> <Text className="title">搜索商品</Text></View>
    </View>
  );
};
export default Search;
