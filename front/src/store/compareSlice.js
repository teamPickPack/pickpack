import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compareMode:"",
  compareList: []
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addCompareItem(state, action){
      if(state.compareList.length === 5) {
        console.log('다섯개 꽉 찼으요...');
        return;
      }
      if(state.compareList.length === 0 || state.compareMode === action.payload.mode){
        if(state.compareList.length === 0){
          state.compareMode = action.payload.mode;
        }
        state.compareList.push(action.payload);
        console.log(action.payload);
        console.log('추가했다고 칩니다~');
      }
      else {
        console.log('편도와 왕복을 동시에 담을 순 없어요,,,,');
      }
    },
    deleteCompareItem(state, action){
      if(state.compareList.length === 0){
        console.log('아니 비어있는데 너 어케 지웠냐...?');
        return;
      }
      state.compareList = state.compareList.filter((compareItem) => compareItem.ticketId !== action.payload.ticketId);
    }
  },
});

export const compareAction = compareSlice.actions;
export default compareSlice;
