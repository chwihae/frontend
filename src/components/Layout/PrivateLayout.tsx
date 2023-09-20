import { Navigate, Outlet, useLocation } from 'react-router-dom';

import HeaderHome from '@components/Layout//HeaderHome';
import HeaderBack from '@components/Layout/HeaderBack';

const PrivateLayout = () => {
  const isLogin = !!localStorage.getItem('accessToken');
  const location = useLocation();
  const pathname = location.pathname;
  const pathParts = pathname.split('/').slice(1);

  return (
    <div className="h-[calc(100vh-60px)]">
      {HEADERS.filter((header) => header.pathname === pathParts[0]).map(
        (component) => (
          <header
            key={component.pathname}
            className="relative flex h-[60px] items-center justify-center bg-amber-300"
          >
            {component.component}
          </header>
        ),
      )}
      {isLogin ? <Outlet /> : <Navigate to="/intro" />}
    </div>
  );
};

export default PrivateLayout;

const HEADERS = [
  { pathname: 'home', component: <HeaderHome /> },
  { pathname: 'question', component: <HeaderBack /> },
  { pathname: 'vote', component: <HeaderBack /> },
];
