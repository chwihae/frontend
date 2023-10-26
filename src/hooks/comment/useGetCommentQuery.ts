import { useQuery } from '@tanstack/react-query';

import { getComment } from '@/apis/vote';
import type { ICommentRes } from '@/types/voteType';

const useGetCommentQuery = (postId: number) => {
  const { data: commentList } = useQuery<ICommentRes[]>({
    queryKey: ['comments', postId],
    queryFn: () => getComment(postId),
  });

  return commentList;
};

export default useGetCommentQuery;
