import { useNavigate, useSearchParams } from 'react-router-dom';

import { postToken } from '@/apis/auth';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authorizeCode = searchParams.get('code');
  console.log(authorizeCode);

  const fatchData = async () => {
    // 토큰발급
    const res = await postToken(authorizeCode);

    if (res.code === 200) {
      navigate('/home');
    }
  };

  fatchData();

  return <div></div>;
};

export default Login;
