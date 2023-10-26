import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment } from '@/apis/vote';

const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  return addCommentMutate;
};

export default useAddCommentMutation;
