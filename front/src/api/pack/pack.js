import axiosInstance from "../axios";

export const getItemList = (request) => {
  console.log(request);
  axiosInstance
    .get(`item/${request.category}/${request.page}`)
    .then((response) => {
      console.log(response);

      return response;
    });
};

export const getItemListSearchByTitle = (request) => {
  axiosInstance
    .get(`item/${request.category}/title/${request.title}/${request.page}`)
    .then((response) => {
      console.log(response);
    });
};

export const getItemListSearchByCity = (request) => {
  axiosInstance
    .get(`item/${request.category}/city/${request.cityId}/${request.page}`)
    .then((response) => {
      console.log(response);
    });
};
