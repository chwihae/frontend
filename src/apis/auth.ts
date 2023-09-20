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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};
