import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getComment } from '@/apis/vote';
import { ReactComponent as IConKebabGray } from '@/assets/icon_kebab_gray.svg';
import { ReactComponent as IConSendGray } from '@/assets/icon_send_gray.svg';
import { ReactComponent as IConSendOrange } from '@/assets/icon_send_orange.svg';
import { useIsBottomSheetContext } from '@/contexts/IsBottomSheetProvider';
import useAddCommentMutation from '@/hooks/comment/useAddCommentMutation';
import type { ICommentGetRes } from '@/types/voteType';
import BottomSheet from '@components/common/BottomSheet';
import Toast from '@components/common/Toast';

const Comments = ({ postId }: { postId: number }) => {
  // 댓글
  const [inputComment, setInputComment] = useState('');
  const [commentId, setCommentId] = useState(0);
  const addCommentMutate = useAddCommentMutation();
  const [toastDeleteComment, setToastDeleteComment] = useState<boolean>(false);

  const handleInputCommentChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputComment !== '') {
      addCommentMutate({ questionId: postId, content: inputComment });
      setInputComment('');
    }
  };

  // 댓글 삭제
  const { setIsBottomSheetOpen } = useIsBottomSheetContext();
  const handleKebabBtn = (id: number) => {
    setIsBottomSheetOpen(true);
    setCommentId(id);
  };
  const { isBottomSheetOpen } = useIsBottomSheetContext();

  // 무한스크롤
  const [ref, inView] = useInView();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['comments', postId],
    ({ pageParam = 0 }) => getComment({ questionId: postId, page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) return lastPage.number + 1;
      },
      select: (newData) => ({
        pages: newData.pages,
        pageParams: newData.pages[0].number,
      }),
    },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return (
    <section className="px-4 pb-[52px] pt-12">
      <h3 className="mb-6 score-bold16">댓글 {data?.pages[0].totalElements}</h3>
      {/* 댓글목록 */}
      <ol className="grid gap-3">
        {data && data?.pages[0].totalElements !== 0 ? (
          <>
            {data.pages.map((page) => (
              <div key={page.number}>
                {page.content.map((comment: ICommentGetRes) => (
                  <div key={comment?.id}>
                    <li className="border-b-[1px] border-b-bg pb-3">
                      <div className="mb-3 flex h-[26px] items-center justify-between notosans-medium16">
                        <span>{comment?.commenterAlias}</span>
                        {comment.editable && (
                          <label
                            htmlFor="bottomSheet-commentEdit-modal"
                            className="flex cursor-pointer items-center justify-between score-medium16"
                            onClick={() => handleKebabBtn(comment?.id)}
                          >
                            <IConKebabGray />
                          </label>
                        )}
                      </div>
                      <p className="mb-1 text-GS2 notosans-regular16">
                        {comment?.content}
                      </p>
                      <span className="text-GS4 notosans-regular12">
                        {comment?.createdAt
                          .replaceAll('-', '.')
                          .replace('T', '. ')}
                      </span>
                    </li>
                    <div ref={ref} className="h-1" />
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <p className="my-16 text-center text-GS4 score-medium12">
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
          className="w-full rounded-[10px] bg-bg px-5 py-[11px] notosans-medium14 placeholder:text-GS4 focus:outline-none"
        />
        <button type="submit" className="p-[10px]">
          {inputComment === '' ? <IConSendGray /> : <IConSendOrange />}
        </button>
      </form>
      {toastDeleteComment && (
        <Toast text="댓글이 삭제됐습니다" setToast={setToastDeleteComment} />
      )}
      {isBottomSheetOpen && (
        <BottomSheet
          modalId="bottomSheet-commentEdit-modal"
          commentId={commentId}
          listArray={['댓글 수정', '댓글 삭제']}
          setToast={setToastDeleteComment}
          // content={inputComment}
        />
      )}
    </section>
  );
};

export default Comments;
