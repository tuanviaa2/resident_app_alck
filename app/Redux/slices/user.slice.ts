import { createSlice } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../constant";
import { login } from "../actions/user.action";
import { Alert } from "react-native";
import { localStorage } from "../../Utils/storage";
import { ResidentInfo } from "../../global";

export type UserSliceState = {
  user: ResidentInfo | null
}
const initialState: UserSliceState = {
  user: null
};
export const userSlice = createSlice({
  name: SLICE_NAME.USER,
  initialState,
  reducers: {
    updateNoti: (state, action) => {
      const  notiId  = action.payload;
      console.log(notiId)
      if (state.user) {
        state.user.notifications = state.user.notifications.map(noti => {
          if (noti._id === notiId) {
            noti.isReading = true;
          }
          return noti;
        });
      }
    }
  },
  extraReducers: builder =>
    builder
      .addCase(login.pending, (state, action) => {

      })
      .addCase(login.rejected, (state, action) => {
        Alert.alert("Đăng nhập thất bại", "Tài khoản hoặc mất khẩu không đúng hoặc không còn được phép sử dụng");
      })
      .addCase(login.fulfilled, (state, action) => {
        const data = action.payload as { user: ResidentInfo, token: string };
        localStorage.set("token", data.token);
        state.user = data.user;
      })
});
export const { updateNoti } = userSlice.actions;
