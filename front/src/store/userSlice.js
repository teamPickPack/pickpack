import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memberId: null, // 유저아이디 대충 암호화~
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.substring(7, action.payload.length);
    },
    setMemberId(state, action) {
      state.memberId = (action.payload + 7) * 2373.15763;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
