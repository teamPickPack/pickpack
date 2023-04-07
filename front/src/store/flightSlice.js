import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wayType: "one",
  criterion: "departure",
  departure: {
    name: "인천",
    subName: "",
    code: "ICN",
    lat: 126.7052,
    lng: 37.4563,
  },
  destination: {
    name: "",
    subName: "",
    code: "",
    lat: "",
    lng: "",
  },
  startDate: new Date().toISOString().substring(0, 10),
  endDate: "",
  direct: [true, false, false, false],
  leftPrice: 0,
  rightPrice: 2000,
  minPrice: 0,
  maxPrice: 2000,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setWayType(state, action) {
      state.wayType = action.payload;
    },
    setCriterion(state, action) {
      state.criterion = state.criterion = action.payload;
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
