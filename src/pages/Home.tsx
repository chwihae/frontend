import { useState } from 'react';
import { Link } from 'react-router-dom';

import Level from '@components/Home/Level';
import TabBar from '@components/Home/TabBar';
import VoteFilterBtn from '@components/Home/VoteFilterBtn';
import VoteList from '@components/Home/VoteList';

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [solvedIndex, setSolvedIndex] = useState(0);

  return (
    <div className="relative h-full">
      <Level />
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
      <Link to="/question">
        <button className="btn absolute bottom-[41px] right-4 h-12 w-12 rounded-full border-0 bg-orange-500 p-0 hover:bg-orange-500">
          작성
        </button>
      </Link>
    </div>
  );
};

export default Home;
