import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="relative mx-auto h-[100vh] max-h-[926px] min-h-[-webkit-fill-available] w-[375px]  max-w-[428px] overflow-y-hidden bg-white shadow-lg">
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
