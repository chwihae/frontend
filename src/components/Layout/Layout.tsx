import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';

import HeaderHome from '@components/Layout//HeaderHome';
import HeaderBack from '@components/Layout/HeaderBack';

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathParts = pathname.split('/').slice(1);

  return (
    <>
      <div className="h-[100vh] min-w-[373px] bg-yellow-50">
        {HEADERS.filter((header) => header.pathname === pathParts[0]).map(
          (component) => (
            <header key={component.pathname} className="h-[60px] bg-amber-300">
              {component.component}
            </header>
          ),
        )}
        <main>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Layout;

const HEADERS = [
  { pathname: 'home', component: <HeaderHome /> },
  { pathname: 'question', component: <HeaderBack /> },
  { pathname: 'vote', component: <HeaderBack /> },
];
