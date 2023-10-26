import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editComment } from '@/apis/vote';

const useEditCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: editCommentMutate } = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  return editCommentMutate;
};

export default useEditCommentMutation;
