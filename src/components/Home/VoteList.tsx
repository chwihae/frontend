import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getVoteAll } from '@/apis/question';
import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmarkCount_gray.svg';
import { ReactComponent as IConCommentGray } from '@/assets/icon_comment_gray.svg';
import { ReactComponent as IConForwardGray } from '@/assets/icon_forward_gray.svg';
import { ReactComponent as IConViewCountGray } from '@/assets/icon_viewCount_gray.svg';
import { RADIOOPTIONS, TABBAR } from '@/constants/home';
import type { IVoteAllContent, IVoteAllRes } from '@/types/voteType';

import NoResults from './NoResults';

type TVoteList = {
  tabIndex: number;
  solvedIndex: number;
};
const VoteList = ({ tabIndex, solvedIndex }: TVoteList) => {
  const [lists, setLists] = useState<IVoteAllContent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res: IVoteAllRes = await getVoteAll({
        type: TABBAR[tabIndex].type,
        status: RADIOOPTIONS[solvedIndex].status,
      });
      setLists(res.content);
    };
    fetchData();
  }, [tabIndex, solvedIndex]);

  // console.log(lists);

  const listsFilterTab = tabIndex
    ? lists?.filter((list) => list.type === TABBAR[tabIndex].type)
    : lists;

  const listFilterSolved = !solvedIndex
    ? listsFilterTab
    : listsFilterTab?.filter(
        (list) => list.status === RADIOOPTIONS[solvedIndex].status,
      );

  return (
    <ol className="flex flex-col">
      {lists && lists.length !== 0 ? (
        <>
          {listFilterSolved?.map((list) => (
            <li key={list.id}>
              <Link
                to={`/vote/${list.id}`}
                className={`relative flex h-[108px] items-center justify-between px-4 py-4 ${
                  list.status === 'IN_PROGRESS' ? null : 'bg-bg text-GS3'
                }`}
              >
                <div className="grid w-[294px] gap-2">
                  {/* 상태뱃지 */}
                  <span className="scoremedium12 w-fit rounded-[37px] border-[1px] border-GS6 px-[9px] py-1 text-GS4">
                    {list.status === 'IN_PROGRESS' ? '해결중' : '해결완료'}
                  </span>
                  {/* 투표제목 */}
                  <p className="notosansbold16 overflow-hidden text-ellipsis whitespace-nowrap">
                    {list.title}
                  </p>
                  {/* 통계치 */}
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
        </>
      ) : (
        <NoResults />
      )}
    </ol>
  );
};

export default VoteList;
