import Card from "./components/card";
import List from "./components/card";

export interface ProductFeed {
  data: any[];
  onClick: Function;
  itemKey?: string;
  initProductNum?: number;
  col?: 1 | 2;
  padding?: number | string;
  borderRadius?: number | string;
  thumb?: string;
}

const Index = (props: ProductFeed) => {
  const { col = 2 } = props;
  if (col == 2) {
    return <Card {...props} />;
  }

  return <List {...props} />;
};
export default Index;
