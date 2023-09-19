import { useState } from 'react';

import ModalPreparing from '@components/common/ModalPreparing';

const Home = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <div>
      <label
        htmlFor="save-modal"
        className="btn"
        onClick={() => setIsModal(true)}
      >
        기능 이름
      </label>
      {isModal && <ModalPreparing name="save-modal" />}
    </div>
  );
};

export default Home;
