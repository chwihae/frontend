import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '@/apis/vote';

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  return deleteCommentMutate;
};

export default useDeleteCommentMutation;
