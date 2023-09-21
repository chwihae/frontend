import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getQuestionAll } from '@/apis/question';
import { RADIOOPTIONS, TABBAR } from '@/constants/home';
import type { IVoteAll } from '@/types/homeType';

type TVoteList = {
  tabIndex: number;
  solvedIndex: number;
};
const VoteList = ({ tabIndex, solvedIndex }: TVoteList) => {
  const [lists, setLists] = useState<IVoteAll[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuestionAll();
      // console.log(res);
      setLists(res?.data);
    };
    fetchData();
  }, [tabIndex]);

  const listsFilterTab = tabIndex
    ? lists?.filter((list) => list.type === TABBAR[tabIndex].type)
    : lists;

  const listFilterSolved = !solvedIndex
    ? listsFilterTab
    : listsFilterTab?.filter(
        (list) => list.status === RADIOOPTIONS[solvedIndex].status,
      );

  return (
    <ol>
      {listFilterSolved?.map((list) => (
        <li key={list.id}>
          <Link
            to={`/vote/${list.id}`}
            className="relative flex h-[85px] w-[329px] py-[18px]"
          >
            <div className="w-[294px]">
              <p>{list.title}</p>
              <p>{list.status}</p>
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
