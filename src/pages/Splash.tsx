import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@components/common/Spinner';

const Splash = () => {
  const navigate = useNavigate();
  const isLogin = !!localStorage.getItem('accessToken');

  useEffect(() => {
    setTimeout(() => {
      if (isLogin) {
        navigate('/home');
      } else {
        navigate('/intro');
      }
    }, 2000);
  }, [isLogin, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <span className="mb-36 text-center">
        Splash 화면입니다. <br /> 2초 뒤 이동합니다.
      </span>
      <Spinner />
    </div>
  );
};

export default Splash;
