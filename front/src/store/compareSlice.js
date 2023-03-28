import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compareMode: "",
  compareList: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addCompareItem(state, action){
      if(state.compareList.length === 0){
        state.compareMode = action.payload.mode;
        state.compareList.push(action.payload);
      }
      else if(state.compareMode === action.payload.mode){
        if(state.compareList.length === 5) {
          return;
        }
        state.compareList.push(action.payload);
      }
      else {
        return;
      }
    },
    deleteCompareItem(state, action){
      if(state.compareList.length === 0){
        console.log('아니 비어있는데 너 어케 지웠냐...?');
        return;
      }
      state.compareList = state.compareList.filter((compareItem) => compareItem.flightId !== action.payload.flightId);
    },
    updateCompareItem(state, action){
      for(let i = 0; i < state.compareList.length; i++){
        if(state.compareList[i].flightId === action.payload.flightId){
          state.compareList[i].isLike = action.payload.isLike;
          break;
        }
      }
    },
    deleteCompareList(state){
      state.compareList = [];
    }
  },
});

export const compareAction = compareSlice.actions;
export default compareSlice;
