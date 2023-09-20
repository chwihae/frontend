import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="h-[100vh] w-[375px] bg-yellow-50">
        <main className="h-full">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Layout;
