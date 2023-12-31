import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { getVoteOption, getVoteSingle } from '@/apis/question';
import type { IVoteOptionsRes, IVoteSingleRes } from '@/types/voteType';

const useVoteQuery = (postId: number) => {
  const location = useLocation();
  const { pathname } = location;

  // 투표글 데이터 가져오기
  const { data: pollPost } = useQuery<IVoteSingleRes>({
    queryKey: ['voteSingle', postId],
    queryFn: () => getVoteSingle(postId),
    enabled: pathname.includes('vote'),
  });

  // 투표 옵션 데이터 가져오기
  const { data: pollOptions, refetch: refetchOptions } =
    useQuery<IVoteOptionsRes>({
      queryKey: ['voteOptions', postId],
      queryFn: () => getVoteOption(postId),
      enabled: pathname.includes('vote'),
    });

  return { pollPost, pollOptions, refetchOptions };
};

export default useVoteQuery;
