import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ImageSplash } from '@/assets/img_splash.svg';

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
      <ImageSplash />
    </div>
  );
};

export default Splash;
