import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
  },
});

export const chatAction = chatSlice.actions;
export default chatSlice;
