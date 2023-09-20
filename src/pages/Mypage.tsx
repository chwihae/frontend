import { useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import LevelImage from '@components/common/LevelImage';
import ModalPreparing from '@components/common/ModalPreparing';

const Mypage = () => {
  const [isModal, setIsModal] = useState(false);
  const user = useUserInfo();
  console.log(user);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 px-4 py-8">
        <LevelImage className="h-[43px] w-[43px]" />
        <p>{user?.email}</p>
        <button>{user?.level} 별랑이</button>
      </div>
      <div>
        <ol className="flex flex-col gap-4">
          <li>
            <button>내가 작성한 글</button>
          </li>
          <li>
            <button>내가 투표한 글</button>
          </li>
          <li>
            <button>내가 저장한 글</button>
          </li>
        </ol>
      </div>
      <div>
        <h2>도움말</h2>
        <ol className="flex flex-col gap-4">
          <li>
            <label
              htmlFor="temp-modal"
              className="btn border-0 p-0"
              onClick={() => setIsModal(true)}
            >
              개인정보 처리방침
            </label>
          </li>
          <li>
            <label
              htmlFor="temp-modal"
              className="btn border-0 p-0"
              onClick={() => setIsModal(true)}
            >
              서비스 이용약관
            </label>
          </li>
        </ol>
      </div>
      <button className="btn border-0 p-0">로그아웃</button>
      {isModal && <ModalPreparing name="temp-modal" />}
    </div>
  );
};

export default Mypage;
