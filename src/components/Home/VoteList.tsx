import { useEffect, useState } from 'react';

import { getVoteAll } from '@/apis/question';
import { RADIOOPTIONS, TABBAR } from '@/constants/home';
import type { IVoteAllContent, IVoteAllRes } from '@/types/voteType';
import PostList from '@components/common/PostList';

type TVoteList = {
  tabIndex: number;
  solvedIndex: number;
};

const VoteList = ({ tabIndex, solvedIndex }: TVoteList) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lists, setLists] = useState<IVoteAllContent[]>([]);

  // 질문전체리스트 조회 호출 함수
  const fetchData = async (page?: number) => {
    if (page === undefined) page = 0;

    const res: IVoteAllRes = await getVoteAll({
      type: TABBAR[tabIndex].type,
      status: RADIOOPTIONS[solvedIndex].status,
      page,
    });

    if (page === 0) {
      setLists(res.content);
    } else {
      setLists((prevLists) => [...prevLists, ...res.content]);
    }
    setCurrentPage(res.number);
  };

  // 탭바, 정렬 전환시
  useEffect(() => {
    setCurrentPage(0);
    // page는 0이 기본값
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, solvedIndex]);

  const listsFilterTab = tabIndex
    ? lists?.filter((list) => list.type === TABBAR[tabIndex].type)
    : lists;

  const listFilterSolved = !solvedIndex
    ? listsFilterTab
    : listsFilterTab?.filter(
        (list) => list.status === RADIOOPTIONS[solvedIndex].status,
      );

  return (
    <PostList
      lists={listFilterSolved}
      fetchFn={fetchData}
      currentPage={currentPage}
    />
  );
};

export default VoteList;
