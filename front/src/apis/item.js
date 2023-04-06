import store from "../store/store";
import Send from "./send";

const itemURL = "/api/item";

export const item = {
  get: {
    category: async (category, page) => {
      const response = await Send.get(`${itemURL}/${category}/${page}`);
      return response;
    },

    city: async (category, cityId, page) => {
      const response = await Send.get(
        `${itemURL}/${category}/city/${cityId}/${page}`
      );
      return response;
    },
    tag: async () => {
      const response = await Send.get(`${itemURL}`);
      return response;
    },
  },
  post: {
    item: async (data) => {
      console.log(data);
      const response = await Send.post(`${itemURL}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    title: async (category, search, page) => {
      const response = await Send.post(`${itemURL}/${category}/title/${page}`, {
        search: search,
      });
      return response;
    },
    detail: async (itemId, memberId) => {
      const response = await Send.post(`${itemURL}/detail`, {
        itemId: itemId,
        memberId: memberId,
      });
      return response;
    },
    like: async (itemId, memberId) => {
      const response = await Send.post(`${itemURL}/like`, {
        itemId: itemId,
        memberId: memberId,
      });
      return response;
    },
  },
  put: {
    like: async (itemId, memberId) => {
      const response = await Send.put(`${itemURL}/like`, {
        itemId: itemId,
        memberId: memberId,
      });
      return response;
    },
    item: async (data, itemId) => {
      const response = await Send.put(`${itemURL}/${itemId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    // schedule: async (reservationIdx, acceptFlag) => {
    //   const response = await Send.put(
    //     `${masterURL}/reservation/accept/${reservationIdx}/${acceptFlag}`,
    //   );
    //   return response;
    // },
  },
  delete: {
    // example: async (idx) => {
    //   const response = await Send.delete(`${masterURL}/mypage/history/${idx}`);
    //   return response;
    // },
  },
};
