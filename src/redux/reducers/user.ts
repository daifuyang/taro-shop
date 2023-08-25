import { login } from "@/services/login";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 创建异步的thunk来获取当前用户信息
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const res = await login();
    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
