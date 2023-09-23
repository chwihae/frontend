import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { getVoteAll } from '@/apis/question';
import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmarkCount_gray.svg';
import { ReactComponent as IConCommentGray } from '@/assets/icon_comment_gray.svg';
import { ReactComponent as IConForwardGray } from '@/assets/icon_forward_gray.svg';
import { ReactComponent as IConViewCountGray } from '@/assets/icon_viewCount_gray.svg';
import { RADIOOPTIONS, TABBAR } from '@/constants/home';
import type { IVoteAllContent, IVoteAllRes } from '@/types/voteType';
import Toast from '@components/common/Toast';
import NoResults from '@components/Home/NoResults';

type TVoteList = {
  tabIndex: number;
  solvedIndex: number;
};
const VoteList = ({ tabIndex, solvedIndex }: TVoteList) => {
  const [ref, inView] = useInView();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lists, setLists] = useState<IVoteAllContent[]>([]);
  const [isLastList, setIsLastList] = useState(false);
  const [isLastListToast, setIsLastListToast] = useState(false);

  // 질문전체리스트 조회 호출 함수
  const fetchData = async (tab: number, solved: number, page?: number) => {
    if (page === undefined) {
      page = 0;
    }

    const res: IVoteAllRes = await getVoteAll({
      type: TABBAR[tab].type,
      status: RADIOOPTIONS[solved].status,
      page,
    });

    if (page === 0) {
      setLists(res.content);
    } else {
      setLists((prevLists) => [...prevLists, ...res.content]);
    }
    setCurrentPage(res.number);
    console.log(res.last, '마지막 글!!!!');
    setIsLastList(res.last);
  };

  // 탭바, 정렬 전환시
  useEffect(() => {
    setCurrentPage(0);
    fetchData(tabIndex, solvedIndex, 0);
  }, [tabIndex, solvedIndex]);

  // 무한스크롤
  useEffect(() => {
    if (isLastList) {
      setIsLastListToast(true);
    } else if (inView) {
      fetchData(tabIndex, solvedIndex, currentPage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

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
          <div ref={ref}></div>
          {isLastListToast && (
            <Toast setToast={setIsLastListToast} text="마지막 글입니다." />
          )}
        </>
      ) : (
        <NoResults />
      )}
    </ol>
  );
};

export default VoteList;
