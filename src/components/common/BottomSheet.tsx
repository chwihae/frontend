import { useNavigate } from 'react-router-dom';

import { deleteQuestion } from '@/apis/question';
import { useIsBottomSheetContext } from '@/contexts/IsBottomSheetProvider';
import useDeleteCommentMutation from '@/hooks/comment/useDeleteCommentMutation';
import useGetPostId from '@/hooks/useGetPostId';

interface IBottomSheet {
  modalId: string;
  isInProgress?: boolean;
  commentId?: number;
  listArray: string[];
}

const BottomSheet = ({
  modalId,
  isInProgress,
  commentId,
  listArray,
}: IBottomSheet) => {
  const navigate = useNavigate();
  const { postId } = useGetPostId();
  const { setIsBottomSheetOpen } = useIsBottomSheetContext();

  // 질문 수정 및 삭제
  const handleVoteEditKebab = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (e.currentTarget.innerText === '글 수정') {
      confirm('개발중입니다.') && setIsBottomSheetOpen(false);
    } else {
      const res = await deleteQuestion(postId);
      res.message === 'OK' &&
        navigate('/home', {
          state: { toastMessage: '투표가 삭제되었어요' },
        });
    }
  };

  // 댓글 수정 및 삭제
  const deleteCommentMutate = useDeleteCommentMutation();
  const handleCommentEditKebab = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (e.currentTarget.innerText === '댓글 수정') {
      confirm('개발중입니다.') && setIsBottomSheetOpen(false);
    } else if (e.currentTarget.innerText === '댓글 삭제') {
      if (commentId) {
        deleteCommentMutate({
          questionId: postId,
          commentId,
        });
        setIsBottomSheetOpen(false);
      }
    }
  };

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal z-10">
        <div className="absolute bottom-0 flex w-[375px] flex-col rounded-t-xl bg-white px-4 pb-[18px] pt-5">
          <ul className="scoremedium16 text-GS1">
            {listArray.map((list) =>
              modalId === 'bottomSheet-voteEdit-modal' ? (
                list === (isInProgress ? '글 수정' : '글 삭제')
              ) : (
                <li key={list} className="py-2">
                  <button
                    type="button"
                    onClick={
                      modalId !== undefined && modalId.includes('voteEdit')
                        ? handleVoteEditKebab
                        : handleCommentEditKebab
                    }
                  >
                    {list}
                  </button>
                </li>
              ),
            )}
            <li className="modal-action mt-0 justify-normal py-2 text-GS4">
              <label htmlFor={modalId} className="cursor-pointer">
                취소
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
