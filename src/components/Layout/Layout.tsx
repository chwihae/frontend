import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="relative mx-auto h-screen max-h-[926px] w-[375px] max-w-[428px] overflow-y-hidden bg-white shadow-lg">
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
