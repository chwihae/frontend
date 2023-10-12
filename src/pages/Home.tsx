import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IConEditWhite } from '@/assets/icon_edit_white.svg';
import Toast from '@components/common/Toast';
import Level from '@components/Home/Level';
import TabBar from '@components/Home/TabBar';
import VoteFilterBtn from '@components/Home/VoteFilterBtn';
import VoteList from '@components/Home/VoteList';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabIndex, setTabIndex] = useState(0);
  const [solvedIndex, setSolvedIndex] = useState(0);
  const [completedToast, setCompletedToast] = useState(false);

  // 질문작성에서 넘어올 때, 등록 완료 토스트
  useEffect(() => {
    if (location.state !== null) {
      location.state.toast && setCompletedToast(true);
      navigate('', { state: null });
    }
  }, [location, navigate]);

  return (
    <>
      <Level />
      <section>
        <TabBar
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          setSolvedIndex={setSolvedIndex}
        />
        <VoteFilterBtn
          solvedIndex={solvedIndex}
          setSolvedIndex={setSolvedIndex}
        />
        <VoteList tabIndex={tabIndex} solvedIndex={solvedIndex} />
      </section>
      <Link to="/question">
        <button className="btn absolute bottom-[41px] right-[16px] h-[50px] w-[50px] rounded-full border-0 bg-orange-500 p-0 hover:bg-orange-500">
          <IConEditWhite />
        </button>
      </Link>
      {completedToast && (
        <Toast setToast={setCompletedToast} text="고민이 등록되었어요" />
      )}
    </>
  );
};

export default Home;
