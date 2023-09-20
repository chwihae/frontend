import { useNavigate, useSearchParams } from 'react-router-dom';

import { postToken } from '@/apis/auth';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authorizeCode = searchParams.get('code');
  console.log(authorizeCode);

  const fatchData = async () => {
    const res = await postToken(authorizeCode);
    console.log(res);

    if (res.code === 200) {
      navigate('/home');
    }
  };

  fatchData();

  return <div>로그인</div>;
};

export default Login;
