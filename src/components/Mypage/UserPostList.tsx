import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getUserPostInfo } from '@/apis/mypage';
import { ReactComponent as IConBookmarkOrange } from '@/assets/icon_bookmark_orange.svg';
import { ReactComponent as IConEditOrange } from '@/assets/icon_edit_orange.svg';
import { ReactComponent as IConVoteOrange } from '@/assets/icon_vote_orange.svg';
import type { IVoteAllContent } from '@/types/voteType';
import PostList from '@components/common/PostList';

const UserPostList = () => {
  const { pathname } = useLocation();

  const [currentpage, setCurrentPage] = useState<number>(0);
  const [lists, setLists] = useState<IVoteAllContent[]>([]);

  const fetchData = async (page?: number) => {
    // type
    const findType = MYPOST.find((item) => item.href === pathname);
    const type = findType?.type;

    // page
    if (page === undefined) page = 0;
    const res = await getUserPostInfo({ type, page });

    if (page === 0) {
      setLists(res.content);
    } else {
      setLists((prevLists) => [...prevLists, ...res.content]);
    }
    setCurrentPage(res.number);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {lists && (
        <PostList lists={lists} fetchFn={fetchData} currentPage={currentpage} />
      )}
    </>
  );
};

export default UserPostList;

const MYPOST = [
  {
    type: 'ME',
    title: '내가 작성한 글',
    icon: <IConEditOrange />,
    href: '/mypage/written',
  },
  {
    type: 'VOTED',
    title: '내가 투표한 글',
    icon: <IConVoteOrange />,
    href: '/mypage/participated',
  },
  {
    type: 'BOOKMARKED',
    title: '내가 저장한 글',
    icon: <IConBookmarkOrange />,
    href: '/mypage/saved',
  },
];
