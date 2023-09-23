import { useNavigate, useSearchParams } from 'react-router-dom';

import { postToken } from '@/apis/auth';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authorizeCode = searchParams.get('code');

  // 토큰발급
  const tokenData = async () => {
    const res = await postToken(authorizeCode);
    if (res.code === 200) {
      navigate('/home');
    } else {
      confirm('인가코드 발급 또는 다른 에러로 로그인에 실패했습니다.');
      navigate('/intro');
    }
  };

  tokenData();

  return <div></div>;
};

export default Login;
