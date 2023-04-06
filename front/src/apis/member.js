import store from "../store/store";
import Send from './send';

const memberURL = 'api/member';
export const member = {
  // 고객 정보 호출
  info: async(data) => { 
    const response  = await Send.get(`${memberURL}/${data / 2373.15763 - 7}`);
    return response;
  },
  // 고객 회원가입
  signup: async (data) => {
    const response = await Send.post(`${memberURL}/join`, data);
    return response;
  },
  // 고객 로그인
  login: async (data) => {
    const response = await Send.post(`${memberURL}/login`, data);
    return response;
  },
  //고객 거래 목록 호출
  deal : async(data) => {
    const response = await Send.get(`${memberURL}/${data / 2373.15763 - 7}/deal`);
    return response;
  },
  //대여 목록 호출
  rent : async(data) => {
    const response = await Send.get(`${memberURL}/${data / 2373.15763 - 7}/rent`);
    return response;
  },
  //찜 목록
  item : async(data) => {
    const response = await Send.get(`${memberURL}/${data / 2373.15763 - 7}/item`);
    return response;
  },
  //편도 알림
  one : async(data) => {
    const response = await Send.get(`${memberURL}/${data / 2373.15763 - 7}/one-flight`);
    return response;
  },
  //왕복 알림
  round : async(data) => {
    const response = await Send.get(`${memberURL}/${data / 2373.15763 - 7}/round-flight`);
    return response;
  },
  onewish: async(data) => {
    const memberId = store.getState().user.memberId;
    const response = await Send.put(`${memberURL}/${memberId / 2373.15763 - 7}/onewayWish`, data);
    return response;
  },
  roundwish: async(data) => {
    const memberId = store.getState().user.memberId;
    const response = await Send.put(`${memberURL}/${memberId / 2373.15763 - 7}/roundwayWish`, data);
    return response;
  },
};
