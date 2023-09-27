import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as IConLogo } from '@/assets/icon_logo.svg';
import { ReactComponent as IConProfile } from '@/assets/icon_profile.svg';
import { ReactComponent as IConSearch } from '@/assets/icon_search.svg';
import ModalPreparing from '@components/common/ModalPreparing';

const HeaderHome = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex h-full items-center justify-between px-4">
      <h1>
        <IConLogo />
      </h1>
      <div className="flex text-sm font-bold">
        <label
          htmlFor="tempt-modal"
          className="btn border-0 p-0"
          onClick={() => setIsModal(true)}
        >
          <IConSearch className="w-12" />
        </label>
        <Link className="flex items-center" to="/mypage">
          <IConProfile className="w-12" />
        </Link>
      </div>
      {isModal && <ModalPreparing name="tempt-modal" />}
    </div>
  );
};

export default HeaderHome;
