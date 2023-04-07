import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatOpen: false,
  roomId: null,
  roomInfo: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatOpen(state, action) {
      state.chatOpen = action.payload;
    },
    setRoomInfo(state, action) {
      const roomInfo = action.payload;
      state.roomInfo = roomInfo;
      if (roomInfo === null) {
        state.roomId = null;
        return;
      }
      state.roomId = roomInfo.roomId;
    },
    setResetState(state) {
      state.roomId = null;
      state.roomInfo = null;
    },
  },
});

export const chatAction = chatSlice.actions;
export default chatSlice;
