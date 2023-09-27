import { Navigate, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  return <>{isLogin ? <Navigate to="/home" /> : <Outlet />}</>;
};

export default PublicLayout;
