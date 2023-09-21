import { Navigate, Outlet, useLocation } from 'react-router-dom';

import HeaderBack from '@components/Layout/HeaderBack';
import HeaderHome from '@components/Layout/HeaderHome';

const PrivateLayout = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  const location = useLocation();
  const pathname = location.pathname;
  const pathParts = pathname.split('/').slice(1);

  return (
    <>
      {HEADERS.filter((header) => header.pathname === pathParts[0]).map(
        (component) => (
          <header key={component.pathname} className="h-[48px] bg-amber-300">
            {component.component}
          </header>
        ),
      )}
      {isLogin ? (
        <main className="hide-scroll h-[calc(100%-48px)] overflow-scroll">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/intro" />
      )}
    </>
  );
};

export default PrivateLayout;

const HEADERS = [
  { pathname: 'home', component: <HeaderHome /> },
  { pathname: 'question', component: <HeaderBack /> },
  { pathname: 'vote', component: <HeaderBack /> },
  { pathname: 'mypage', component: <HeaderBack /> },
];
