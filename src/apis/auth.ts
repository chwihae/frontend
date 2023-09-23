import { auth } from './axios';

// 인가코드로 토큰발급 요청
export const postToken = async (authorizeCode: string | null) => {
  try {
    const { data } = await auth.post('/api/v1/auth/kakao-login', {
      authorizationCode: authorizeCode,
      redirectionUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    });
    localStorage.setItem('accessToken', JSON.stringify(data?.data?.token));
    localStorage.setItem(
      'refreshToken',
      JSON.stringify(data?.data?.refreshToken),
    );
    localStorage.setItem('userId', JSON.stringify(data?.data?.userId));
    return data;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

// 유저 정보 얻기
export const getUserLevel = async () => {
  try {
    const { data } = await auth.get('/api/v1/users/statistics');
    if (data.code === 200) {
      localStorage.setItem('userLevel', JSON.stringify(data?.data));
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
