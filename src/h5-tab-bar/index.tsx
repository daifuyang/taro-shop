import "./index.scss";
import Tabbar from "@/components/tabbar";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { setTabbarActive } from "@/redux/reducers/common";

const MyTabbar = () => {
  const config = useAppSelector((s) => s.common.tabbar);
  const dispatch = useDispatch();
  return (
    <Tabbar
      onChange={(index) => {
        dispatch(setTabbarActive(index));
      }}
      {...config}
    />
  );
};

export default MyTabbar;
