import { Navigate, Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  return (
    <div className="h-[calc(100vh-60px)]">
      {isLogin ? <Outlet /> : <Navigate to="/intro" />}
    </div>
  );
};

export default PrivateLayout;
