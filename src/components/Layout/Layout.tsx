import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="hide-scroll relative mx-auto h-screen max-h-[926px] w-[375px] max-w-[428px] overflow-scroll bg-white shadow-lg">
    <div className="h-full">
      <Outlet />
    </div>
  </div>
);

export default Layout;
