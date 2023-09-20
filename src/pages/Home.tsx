import { useState } from 'react';
import { Link } from 'react-router-dom';

import Level from '@components/Home/Level';
import TabBar from '@components/Home/TabBar';
import VoteList from '@components/Home/VoteList';

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="relative h-full">
      <Level />
      <TabBar tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div className="px-4 pt-4">
        <div className="mb-3">해결중 해결완료</div>
        <VoteList tabIndex={tabIndex} />
      </div>
      <Link to="/question">
        <button className="btn absolute bottom-[41px] right-4 h-12 w-12 rounded-full border-0 bg-orange-500 p-0 hover:bg-orange-500">
          작성
        </button>
      </Link>
    </div>
  );
};

export default Home;
