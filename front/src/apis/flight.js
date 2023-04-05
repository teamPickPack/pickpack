import store from "../store/store";
import Send from "./send";

const flightURL = "/api/flight";

export const flight = {
  get: {
    tourist: async (data) => {
      const response = await Send.get(`${flightURL}/tourist/${data}`);
      return response;
    },
    ticket: async (data) => {
      const response = await Send.get(`${flightURL}/${data}`)
      return response;
    }
  },
  post: {
    // 편도 항공권 조회
    one: async (data) => {
      const memberId = store.getState().user.memberId;
      if (memberId === null) {
        data.memberId = null;
      } else {
        data.memberId = memberId / 2373.15763 - 7;
      }

      const response = await Send.post(`${flightURL}/one`, data);
      return response;
    },
    round: async (data) => {
      const memberId = store.getState().user.memberId;
      if (memberId === null) {
        data.memberId = null;
      } else {
        data.memberId = memberId / 2373.15763 - 7;
      }

      const response = await Send.post(`${flightURL}/round`, data);
      return response;
    },
    likeOne: async (data) => {
      const memberId = store.getState().user.memberId;
      if(memberId === null) {
        alert('로그인이 필요한 기능입니다.');
        return;
      } else{
        data.memberId = memberId / 2373.15763 - 7;
      }
      const response = await Send.post(`${flightURL}/one/like`, data);
      return response;
    }
  },
  put: {
    likeOne: async (data) => {
      const memberId = store.getState().user.memberId;
      if(memberId === null) {
        alert('로그인이 필요한 기능입니다.');
        return;
      } else{
        data.memberId = memberId / 2373.15763 - 7;
      }
      const response = await Send.put(`${flightURL}/one/like`, data);
      return response;
    }
    // //내 정보 수정
    // profile: async (data, idx) => {
    //   const response = await Send.put(
    //     `${customerURL}/mypage/profile/${idx}`,
    //     data,
    //   );
    //   return response;
    // },
  },
  delete: {
    // //리뷰 삭제
    // review: async (idx) => {
    //   const response = await Send.delete(`${customerURL}/mypage/review/${idx}`);
    //   return response;
    // },
  },
};
