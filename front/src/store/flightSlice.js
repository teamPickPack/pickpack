import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wayType: "one",
  departure: {
    name: "시엠립",
    subName: "(앙코르왔뜨)",
    code: "REP",
  },
  destination: {
    name: "시엠립",
    subName: "(앙코르와트)",
    code: "REP",
  },
  startDate: new Date().toISOString().substring(0, 10),
  endDate: "",
  direct: "all",
  leftPrice: 0,
  rightPrice: 2000,
  minPrice: 0,
  maxPrice: 2000,
  sortType: "",
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setWayType(state, action) {
      state.wayType = action.payload;
    },
    setDeparture(state, action) {
      state.departure = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setDirect(state, action) {
      state.direct = action.payload;
    },
    setLeftPrice(state, action) {
      state.leftPrice = action.payload;
    },
    setRightPrice(state, action) {
      state.rightPrice = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
  },
});

export const flightAction = flightSlice.actions;
export default flightSlice;
