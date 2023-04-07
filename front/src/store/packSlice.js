import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchType: null,
  searchText: null,
  pageNum: 0,
  hasNext: true,
};

const packSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setSearchType(state, action) {
      state.searchType = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setPageNum(state, action) {
      state.pageNum = action.payload;
    },
    setHasNext(state, action) {
      state.hasNext = action.payload;
    },
    reset(state) {
      state = initialState;
    },
  },
});

export const packAction = packSlice.actions;
export default packSlice;
