import { useQuery } from '@tanstack/react-query';

import { getVoteOption, getVoteSingle } from '@/apis/question';
import type { IVoteOptionsRes, IVoteSingleRes } from '@/types/voteType';

const useVoteQuery = (postId: number) => {
  // 투표글 데이터 가져오기
  const { data: pollPost } = useQuery<IVoteSingleRes>({
    queryKey: ['voteSingle', postId],
    queryFn: () => getVoteSingle(postId),
  });

  // 투표 옵션 데이터 가져오기
  const { data: pollOptions, refetch: refetchOptions } =
    useQuery<IVoteOptionsRes>({
      queryKey: ['voteOptions', postId],
      queryFn: () => getVoteOption(postId),
    });

  return { pollPost, pollOptions, refetchOptions };
};
export default useVoteQuery;
