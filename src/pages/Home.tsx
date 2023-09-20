import { Link } from 'react-router-dom';

import Level from '@components/Home/Level';

const Home = () => {
  return (
    <div className="relative h-full">
      <Level />
      <Link to="/question">
        <button className="btn absolute bottom-[41px] right-4 h-12 w-12 rounded-full border-0 bg-orange-500 p-0 hover:bg-orange-500">
          작성
        </button>
      </Link>
    </div>
  );
};

export default Home;
