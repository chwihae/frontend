import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getVoteAll } from '@/apis/home';
import { TABBAR } from '@/constants/home';
import type { IVoteAll } from '@/types/homeType';

const VoteList = ({ tabIndex }: { tabIndex: number }) => {
  const [lists, setLists] = useState<IVoteAll[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVoteAll();
      console.log(res);
      setLists(res?.data);
    };
    fetchData();
  }, [tabIndex]);

  const newLists = tabIndex
    ? lists?.filter((list) => list.type === TABBAR[tabIndex].type)
    : lists;

  console.log(newLists);

  return (
    <ol>
      {newLists?.map((list) => (
        <li key={list.id}>
          <Link
            to={`/vote/${list.id}`}
            className="relative flex h-[85px] w-[329px] py-[18px]"
          >
            <div className="w-[294px]">
              <p>{list.title}</p>
              <div className="flex gap-3">
                <span>{list.viewCount}</span>
                <span>{list.commentCount}</span>
                <span>{list.bookmarkCount}</span>
              </div>
            </div>
            <button className="absolute right-0">아이콘</button>
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default VoteList;
