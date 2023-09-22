import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import getQuestionAll from '@/apis/question';
import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmarkCount_gray.svg';
import { ReactComponent as IConCommentGray } from '@/assets/icon_comment_gray.svg';
import { ReactComponent as IConForwardGray } from '@/assets/icon_forward_gray.svg';
import { ReactComponent as IConViewCountGray } from '@/assets/icon_viewCount_gray.svg';
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
    <ol className="flex flex-col gap-6">
      {listFilterSolved?.map((list) => (
        <li key={list.id}>
          <Link
            to={`/vote/${list.id}`}
            className="relative flex h-[84px] items-center justify-between"
          >
            <div className="grid w-[294px] gap-2">
              <p className="scoremedium12 w-fit rounded-[37px] border-[1px] border-GS6 px-[9px] py-1 text-GS4">
                {list.status === 'IN_PROGRESS' ? '해결중' : '해결완료'}
              </p>
              <p className="notosansbold16 overflow-hidden text-ellipsis whitespace-nowrap">
                {list.title}
              </p>
              <ul className="notosansmedium12 flex gap-2  text-GS4">
                <li className="flex items-center gap-[2px]">
                  <IConViewCountGray />
                  <span>{list.viewCount}</span>
                </li>
                <li className="flex items-center gap-[2px]">
                  <IConCommentGray />
                  <span>{list.commentCount}</span>
                </li>
                <li className="flex items-center gap-[2px]">
                  <IConBookmarkGray />
                  <span>{list.bookmarkCount}</span>
                </li>
              </ul>
            </div>
            <IConForwardGray />
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default VoteList;
