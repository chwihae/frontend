import { Navigate, Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  return <>{isLogin ? <Outlet /> : <Navigate to="/intro" />}</>;
};

export default PrivateLayout;
