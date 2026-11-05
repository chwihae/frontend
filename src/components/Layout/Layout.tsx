import { Outlet } from 'react-router-dom';

import useTempMockData from '@/hooks/useTempMockData';

const Layout = () => {
  const { noticeMessage } = useTempMockData();

  return (
    // 안내 문구가 스크롤과 무관하게 화면 하단에 고정되도록 스크롤 영역 바깥에 둔다
    <div className="relative mx-auto h-screen max-h-[926px] w-[375px] max-w-[428px]">
      <div className="hide-scroll relative h-full overflow-scroll bg-white shadow-lg">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-[30px] left-1/2 z-[5] -translate-x-1/2 whitespace-nowrap rounded-full bg-GS1/70 px-3 py-1 text-white score-medium12">
        {noticeMessage}
      </p>
    </div>
  );
};

export default Layout;
