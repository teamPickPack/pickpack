import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userAction = userSlice.actions;
export default userSlice;
