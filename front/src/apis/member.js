import Send from "./send";

const memberURL = "api/member";
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
  }

};
//사용범: api 사용할 곳에서
//import {member} from '?'
//const response = await member.함수(data)
