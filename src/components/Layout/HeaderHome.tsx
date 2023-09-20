import { useState } from 'react';
import { Link } from 'react-router-dom';

import ModalPreparing from '@components/common/ModalPreparing';

const HeaderHome = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex h-full items-center justify-between">
      <h1 className="p-[15px] pt-4">CHWIHAE</h1>
      <div className="flex text-sm font-bold">
        <label
          htmlFor="save-modal"
          className="btn border-0"
          onClick={() => setIsModal(true)}
        >
          검색
        </label>
        <Link className="mr-4 flex items-center" to="/mypage">
          플필
        </Link>
      </div>
      {isModal && <ModalPreparing name="save-modal" />}
    </div>
  );
};

export default HeaderHome;
