import axiosInstance from "../axios";

export const searchFlightOne = (request) => {
  axiosInstance
    .post("flight/one", request, {
      headers: {},
    })
    .then((response) => {
      console.log(response);
    });
};

export const searchFlightRound = (request) => {
  console.log(request);
  axiosInstance.post("flight/round", request).then((response) => {
    console.log(response);
  });
};
