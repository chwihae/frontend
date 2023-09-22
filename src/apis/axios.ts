import type { AxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

export const auth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

auth.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;

    const accessToken = JSON.parse(localStorage.getItem('accessToken') || '{}');

    if (accessToken !== null) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const getAccessToken = async (config: AxiosRequestConfig) => {
  try {
    // 리프레쉬 토큰으로 액세스토큰 재요청
    const refreshToken = JSON.parse(
      localStorage.getItem('refreshToken') || '{}',
    );

    const res = await axios({
      method: 'POST',
      url: `${config.baseURL}/auth/reissue`,
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    // 액세스토큰 로컬저장 및 반환
    const accessToken = res.data.data.token;
    localStorage.setItem('accessToken', JSON.stringify(res.data.data));

    return accessToken;
  } catch (e) {
    localStorage.removeItem('accessToken');
  }
};

auth.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    // 토큰 에러가 아닐 떄
    if (config.url === config.baseURL || status !== 401 || config.sent) {
      if (err instanceof AxiosError) {
        return Promise.reject(err.response?.data);
      }
    }

    // 액세스 토큰 에러일 때
    config.sent = true;
    const accessToken = await getAccessToken(config);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 리프레쉬 토큰 에러일 때 대비

    return axios(config);
  },
);
