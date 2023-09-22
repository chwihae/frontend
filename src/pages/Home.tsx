import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as IConEditWhite } from '@/assets/icon_edit_white.svg';
import Level from '@components/Home/Level';
import TabBar from '@components/Home/TabBar';
import VoteFilterBtn from '@components/Home/VoteFilterBtn';
import VoteList from '@components/Home/VoteList';

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [solvedIndex, setSolvedIndex] = useState(0);

  return (
    <>
      <Level />
      <TabBar
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        setSolvedIndex={setSolvedIndex}
      />
      <div className="px-4 py-3">
        <VoteFilterBtn
          solvedIndex={solvedIndex}
          setSolvedIndex={setSolvedIndex}
        />
        <VoteList tabIndex={tabIndex} solvedIndex={solvedIndex} />
        <Link to="/question">
          <button className="btn absolute bottom-[41px] right-[16px] h-[50px] w-[50px] rounded-full border-0 bg-orange-500 p-0 hover:bg-orange-500">
            <IConEditWhite />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
