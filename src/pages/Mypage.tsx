import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as IConBookmarkOrange } from '@/assets/icon_bookmark_orange.svg';
import { ReactComponent as IConEditOrange } from '@/assets/icon_edit_orange.svg';
import { ReactComponent as IConForwardGray } from '@/assets/icon_forward_gray.svg';
import { ReactComponent as IConForwardWhite } from '@/assets/icon_forward_white.svg';
import { ReactComponent as IConVoteOrange } from '@/assets/icon_vote_orange.svg';
import { HELP } from '@/constants/mypage';
import getLocalData from '@/utils/getLocalData';
import LevelImage from '@components/common/LevelImage';
import ModalPreparing from '@components/common/ModalPreparing';

const Mypage = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const userId = getLocalData('userId');
  const userLevelInfo = getLocalData('userLevel');

  // 로그아웃
  const handleSignOut = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userLevel');
      navigate('/intro');
    }
  };

  const MYPOST = [
    {
      type: 'ME',
      title: '작성한 글',
      icon: <IConEditOrange />,
      href: '/mypage/written',
    },
    {
      type: 'VOTED',
      title: '투표한 글',
      icon: <IConVoteOrange />,
      href: '/mypage/participated',
    },
    {
      type: 'BOOKMARKED',
      title: '저장한 글',
      icon: <IConBookmarkOrange />,
      href: '/mypage/saved',
    },
  ];

  return (
    <div className="relative h-full">
      {/* 상단부 */}
      <div className="mb-11 flex items-center justify-between px-4 pt-[40px]">
        <div className="flex items-center gap-3">
          <LevelImage className="h-[60px] w-[60px]" />
          <p className="score-bold20">별랑이{userId}</p>
        </div>
        <Link
          className="flex cursor-pointer items-center gap-[2px] rounded-[18px] bg-prime1 px-[9px] py-1 text-white score-medium12 hover:bg-prime1"
          to="/mypage/level"
        >
          {userLevelInfo.name}별랑이
          <IConForwardWhite />
        </Link>
      </div>
      {/* MY */}
      <div>
        <h2 className="mb-10 px-4 text-GS4 score-medium14">MY</h2>
        <ol className="p flex flex-col gap-8 border-b-[10px] border-bg px-4 pb-[40px]">
          {MYPOST.map((list) => (
            <li key={list.title}>
              <Link
                to={list.href}
                className="flex cursor-pointer justify-between score-medium16"
              >
                <div className="flex items-center gap-1 ">
                  {list.icon}
                  {list.title}
                </div>
                <IConForwardGray />
              </Link>
            </li>
          ))}
        </ol>
      </div>
      {/* 도움말 */}
      <div className="relative flex-grow-0 px-4">
        <h2 className="pb-14 pt-10 text-GS4 score-medium14">도움말</h2>
        <ol className="mb-[313px] flex flex-col gap-8 score-medium16">
          {HELP.map((item) => (
            <li key={item} className="h-fit">
              <label
                htmlFor="temp-modal"
                className="h-0 cursor-pointer border-0 p-0"
                onClick={() => setIsModal(true)}
              >
                {item}
              </label>
            </li>
          ))}
        </ol>
        {/* 로그아웃 버튼 */}
        <button
          type="button"
          className="mx-auto block cursor-pointer border-0 p-0 pb-10 text-center underline score-medium12"
          onClick={handleSignOut}
        >
          로그아웃
        </button>
      </div>
      {isModal && <ModalPreparing name="temp-modal" />}
    </div>
  );
};

export default Mypage;
