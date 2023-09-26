import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IConBackBlack } from '@/assets/icon_back_black.svg';
import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmark_gray.svg';
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

  const MYPOST = [
    {
      title: '작성한 글',
      href: '/mypage/written',
    },
    {
      title: '투표한 글',
      href: '/mypage/voted',
    },
    {
      title: '저장한 글',
      href: '/mypage/saved',
    },
  ];

  const mypageTitle = MYPOST.find((mypage) => mypage.href === pathname);

  const handleBackBtn = () => {
    if (findTitle === '글쓰기') {
      if (confirm(`글쓰기를 그만두시겠어요?\n작성중인 내용이 삭제됩니다.`)) {
        navigate('/home');
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative flex h-full items-center justify-between px-4">
      <button className="" onClick={handleBackBtn}>
        {pathParts[0] === 'question' ? <IConCloseBlack /> : <IConBackBlack />}
      </button>
      <h1 className="scorebold18 absolute left-1/2 translate-x-[-50%]">
        {findTitle === '마이페이지' ? mypageTitle?.title : findTitle}
      </h1>
      {pathParts[0] === 'vote' ? (
        <button className="">
          <IConBookmarkGray />
        </button>
      ) : null}
    </div>
  );
};

export default HeaderBack;
