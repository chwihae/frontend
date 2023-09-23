import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IConBackBlack } from '@/assets/icon_back_black.svg';
import { ReactComponent as IConCloseBlack } from '@/assets/icon_close_black.svg';

const HeaderBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const pathParts = pathname.split('/').slice(1);

  const findTitle =
    pathParts[1] === 'edit'
      ? '글수정'
      : pathParts[0] === 'question'
      ? '글쓰기'
      : pathParts[0] === 'mypage'
      ? '마이페이지'
      : null;

  return (
    <div className="relative flex h-full items-center justify-between px-4">
      <button className="" onClick={() => navigate('/home')}>
        {pathParts[0] === 'question' ? <IConCloseBlack /> : <IConBackBlack />}
      </button>
      <h1 className="scorebold18 absolute left-1/2 translate-x-[-50%]">
        {findTitle}
      </h1>
      {pathParts[0] === 'vote' ? (
        <button className="p-[15px] pt-4" onClick={() => navigate('/home')}>
          저장 또는 케밥
        </button>
      ) : null}
    </div>
  );
};

export default HeaderBack;
