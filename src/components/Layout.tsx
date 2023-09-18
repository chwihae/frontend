import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div>네브바</div>
      <main className="mx-auto mt-16 max-w-7xl px-4 pb-64 pt-16">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};

export default Layout;
