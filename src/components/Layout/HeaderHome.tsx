import { useState } from 'react';
import { Link } from 'react-router-dom';

import ModalPreparing from '@components/common/ModalPreparing';

const HeaderHome = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <h1 className="absolute">CHWIHAE</h1>
      <div className="absolute right-2 flex text-sm font-bold">
        <label
          htmlFor="save-modal"
          className="btn border-0"
          onClick={() => setIsModal(true)}
        >
          검색
        </label>
        <Link className="flex items-center" to="/mypage">
          플필
        </Link>
      </div>
      {isModal && <ModalPreparing name="save-modal" />}
    </>
  );
};

export default HeaderHome;
