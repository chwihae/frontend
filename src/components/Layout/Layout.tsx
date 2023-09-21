import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div className="overflow-y-hidde relative mx-auto h-[100vh] max-h-[926px] w-full min-w-[375px] max-w-[428px] bg-white shadow-lg">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
