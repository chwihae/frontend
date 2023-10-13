import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { addComment, getComment } from '@/apis/vote';
import { ReactComponent as IConKebabGray } from '@/assets/icon_kebab_gray.svg';
import { ReactComponent as IConSendGray } from '@/assets/icon_send_gray.svg';
import { ReactComponent as IConSendOrange } from '@/assets/icon_send_orange.svg';
import type { ICommentRes } from '@/types/voteType';
import ModalPreparing from '@components/common/ModalPreparing';

const Comments = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  const [isModal, setIsModal] = useState(false);

  //댓글
  const [inputComment, setInputComment] = useState('');
  const { data: commentList } = useQuery<ICommentRes[]>({
    queryKey: ['comments', postId],
    queryFn: () => getComment(postId),
  });

  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
  });

  const handleInputCommentChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputComment !== '') {
      addCommentMutate({ questionId: postId, comment: inputComment });
      setInputComment('');
    }
  };

  return (
    <>
      <section className="px-4 pb-[49px] pt-10">
        <h3 className="scorebold16 mb-6">댓글 {commentList?.length}</h3>
        {/* 댓글목록 */}
        <ol className="grid gap-3">
          {commentList?.length !== 0 ? (
            commentList
              ?.sort((a, b) => a.id - b.id)
              .map((comment) => (
                <li key={comment?.id}>
                  <div className="notosansmedium16 mb-3 flex items-center justify-between">
                    <span>{comment?.commenterAlias}</span>
                    <label
                      htmlFor="temp-modal"
                      className="cursor-pointer"
                      onClick={() => setIsModal(true)}
                    >
                      <IConKebabGray />
                    </label>
                  </div>
                  <p className="notosansregular16 mb-1 text-GS2">
                    {comment?.content}
                  </p>
                  <span className="notosansregular12 text-GS4">
                    {comment?.createdAt.replaceAll('-', '.').replace('T', '. ')}
                  </span>
                </li>
              ))
          ) : (
            <p className="scoremedium12 my-16 text-center text-GS4">
              아직 댓글이 없어요
              <br />
              가장 먼저 댓글을 남겨보세요
            </p>
          )}
        </ol>
        <form
          onSubmit={handleCommentSubmit}
          className="mt-9 flex h-11 items-center gap-[5px]"
        >
          <input
            type="text"
            maxLength={500}
            value={inputComment}
            placeholder="댓글을 입력해주세요"
            onChange={handleInputCommentChange}
            className="notosansmedium14 w-full rounded-[10px] bg-bg px-5 py-[11px] placeholder:text-GS4 focus:outline-none"
          />
          <button type="submit" className="p-[10px]">
            {inputComment === '' ? <IConSendGray /> : <IConSendOrange />}
          </button>
        </form>
      </section>
      {isModal && <ModalPreparing name="temp-modal" />}
    </>
  );
};

export default Comments;
