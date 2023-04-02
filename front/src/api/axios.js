import axios from "axios";

// export const getAuthHeader = () => {
//   const accessToken = store.getState().user.accessToken;
//   if (accessToken) {
//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//     };

//     return headers;
//   } else {
//     return null;
//   }
// };

const axiosInstance = axios.create({
  baseURL: `https://j8b307.p.ssafy.io/api/`,
  "Content-Type": "application/json",
});

// axiosInstance.interceptors.response.use(
//   (success) => success,
//   async (error) => {
//     console.error(error);
//     const errorCode = error?.code;

//     if (errorCode === "ERR_NETWORK") {
//       const user = store.getState().user;

//       const { accessToken, refeshToken, userInfo } = user;
//       const isRealtor = userInfo.isRealtor;

//       const data = { accessToken };

//       if (isRealtor === null) return;
//       else if (isRealtor === false) {
//         await axiosInstance
//           .post("users/reissue", data)
//           .then()
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         await axiosInstance
//           .post("realtors/reissue", data)
//           .then()
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//       return Promise.reject(error);
//     }
//   }
// );

export default axiosInstance;
