import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  memberId: null,
  nickname: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      const token = action.payload.substring(7, action.payload.length);
      const userInfo = jwt_decode(token);
      console.log(userInfo);
      state.accessToken = token;
      state.nickname = userInfo.nickname;
      state.memberId = (userInfo.id + 7) * 2373.15763; // 유저아이디 대충 암호화~
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
