import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { IsBottomSheetProvider } from '@/contexts/IsBottomSheetProvider';
import HeaderBack from '@components/Layout/HeaderBack';
import HeaderHome from '@components/Layout/HeaderHome';

const PrivateLayout = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  const location = useLocation();
  const { pathname } = location;

  return (
    <IsBottomSheetProvider>
      <header className="h-12">
        {pathname === '/home' ? <HeaderHome /> : <HeaderBack />}
      </header>
      {isLogin ? (
        <main className="hide-scroll h-[calc(100%-48px)] overflow-scroll">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/intro" />
      )}
    </IsBottomSheetProvider>
  );
};

export default PrivateLayout;
