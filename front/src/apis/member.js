import Send from "./send";

const memberURL = "api/member";
export const member = {
  // // 고객 아이디 중복 검사
  // checkDuplicate: async (data) => {
  //   const response = await Send.post(
  //     `${memberURL}/member/check/duplicate/`,
  //     data,
  //   );
  //   return response;
  // },
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
};
//사용범: api 사용할 곳에서
//import {member} from '?'
//const response = await member.함수(data)
