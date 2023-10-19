import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { IsBottomSheestProvider } from '@/contexts/IsBottomSheetProvider';
import HeaderBack from '@components/Layout/HeaderBack';
import HeaderHome from '@components/Layout/HeaderHome';

const PrivateLayout = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <IsBottomSheestProvider>
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
      </IsBottomSheestProvider>
    </>
  );
};

export default PrivateLayout;
