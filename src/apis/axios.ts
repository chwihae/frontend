/* eslint-disable no-console */
// import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const auth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

auth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken !== null) {
      config.headers.Authorization = JSON.parse(accessToken);
    }

    return config;
  },
  (error) => console.log(error),
);

// const getAccessToken = async (config: AxiosRequestConfig) => {
//   try {
//     // 리프레쉬 토큰으로 액세스토큰 재요청
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (refreshToken !== null) {
//       const res = await axios({
//         method: 'POST',
//         url: `${config.baseURL}/auth/reissue`,
//         headers: { Authorization: `${JSON.parse(refreshToken)}` },
//       });

//       const accessToken = res.data.data.token;
//       localStorage.setItem('accessToken', JSON.stringify(accessToken));

//       return accessToken;
//     }
//   } catch (error) {
//     return console.log(error);
//   }
// };

auth.interceptors.response.use(
  (res) => res,
  async (error) => {
    // const { config } = error;

    // 액세스 토큰 유효하지 않음
    if (error.response.data.code === 1001) {
      console.log('토큰 유효하지 않음');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userLevel');

      // TODO : 리프레쉬토큰으로 액세스토큰 재발급 api 요청 필요
      // const accessToken = await getAccessToken(config);
      // if (accessToken) {
      //   config.headers.Authorization = `${accessToken}`;
      // }
    }

    return console.log(error);
  },
);
