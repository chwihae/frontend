import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="h-[100vh] min-w-[373px] bg-yellow-50">
        <main className="h-full">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Layout;
