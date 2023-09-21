import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="relative mx-auto h-[100vh] max-h-[926px] w-full min-w-[375px] max-w-[428px] overflow-y-hidden bg-yellow-50">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Layout;
