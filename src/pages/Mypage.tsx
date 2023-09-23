import { useState } from 'react';

import { ReactComponent as IConBookmarkOrange } from '@/assets/icon_bookmark_orange.svg';
import { ReactComponent as IConEditOrange } from '@/assets/icon_edit_orange.svg';
import { ReactComponent as IConForwardWhite } from '@/assets/icon_forward_white.svg';
import { ReactComponent as IConVoteOrange } from '@/assets/icon_vote_orange.svg';
import { LEVELSTEP } from '@/constants/home';
import getLocalData from '@/utils/getLocalData';
import LevelImage from '@components/common/LevelImage';
import ModalPreparing from '@components/common/ModalPreparing';

const Mypage = () => {
  const [isModal, setIsModal] = useState(false);
  const userId = getLocalData('userId');

  // 등급 이름
  const userLevel = getLocalData('userLevel');
  const userLevelName = LEVELSTEP.find(
    (level) => level.type === userLevel?.level,
  );

  return (
    <div className="relative flex h-full flex-col">
      {/* 상단부 */}
      <div className="">
        <div className="flex items-center justify-between px-4 pb-[76px] pt-[45px]">
          <div className="flex items-center gap-3">
            <LevelImage className="h-[43px] w-[43px]" />
            <p className="scorebold20">별랑이{userId}</p>
          </div>
          <label
            htmlFor="temp-modal"
            className="scoremedium12 scoremedium16 flex cursor-pointer items-center gap-[2px] rounded-[18px] bg-prime1 px-[9px] py-1 text-white hover:bg-prime1"
            onClick={() => setIsModal(true)}
          >
            {userLevelName?.name}별랑이
            <IConForwardWhite />
          </label>
        </div>
        <ol className="p flex flex-col gap-4 border-b-[10px] border-[#f3f3f3] px-4 pb-[40px]">
          <li>
            <label
              htmlFor="temp-modal"
              className="scoremedium16 flex cursor-pointer gap-1"
            >
              <IConEditOrange />
              내가 작성한 글
            </label>
          </li>
          <li>
            <label
              htmlFor="temp-modal"
              className="scoremedium16 flex cursor-pointer gap-1"
            >
              <IConVoteOrange />
              내가 투표한 글
            </label>
          </li>
          <li>
            <label
              htmlFor="temp-modal"
              className="scoremedium16 flex cursor-pointer gap-1"
            >
              <IConBookmarkOrange />
              내가 저장한 글
            </label>
          </li>
        </ol>
      </div>
      {/* 도움말 */}
      <div className="px-4">
        <h2 className="scoremedium14 pb-14 pt-10 text-GS4">도움말</h2>
        <ol className="scoremedium16 flex flex-col gap-8">
          <li className="h-fit">
            <label htmlFor="temp-modal" className="h-0 border-0 p-0">
              개인정보 처리방침
            </label>
          </li>
          <li className="h-fit">
            <label htmlFor="temp-modal" className="h-0 border-0 p-0">
              서비스 이용약관
            </label>
          </li>
        </ol>
      </div>
      {/* 로그아웃 버튼 */}
      <label
        htmlFor="temp-modal"
        className="scoremedium12 absolute bottom-10 left-1/2 translate-x-[-50%] cursor-pointer border-0 p-0 underline"
      >
        로그아웃
      </label>
      {isModal && <ModalPreparing name="temp-modal" />}
    </div>
  );
};

export default Mypage;
