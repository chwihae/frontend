import { useNavigate } from 'react-router-dom';

import { deleteQuestion } from '@/apis/question';
import { useIsBottomSheestContext } from '@/contexts/IsBottomSheetProvider';
import useGetPostId from '@/hooks/useGetPostId';

interface IBottomSheest {
  id: string;
  isInProgress: boolean;
  listArray: string[];
}

const BottomSheet = ({ id, isInProgress, listArray }: IBottomSheest) => {
  const navigate = useNavigate();
  const { postId } = useGetPostId();
  const { setIsBottomSheetOpen } = useIsBottomSheestContext();

  // 질문 수정 및 삭제
  const handleVoteEditableKebab = async (
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

  return (
    <>
      <input type="checkbox" id="bottomSheet-modal" className="modal-toggle" />
      <div className="modal z-10">
        <div className="absolute bottom-0 flex w-[375px] flex-col rounded-t-xl bg-white px-4 pb-[18px] pt-5">
          <ul className="scoremedium16 text-GS1">
            {listArray.map((list) =>
              !isInProgress && list === '글 수정' ? null : (
                <li key={list} className="py-2">
                  <button
                    type="button"
                    onClick={
                      id === 'voteEditable'
                        ? handleVoteEditableKebab
                        : undefined
                    }
                  >
                    {list}
                  </button>
                </li>
              ),
            )}
            <li className="modal-action mt-0 justify-normal py-2 text-GS4">
              <label htmlFor="bottomSheet-modal" className="cursor-pointer">
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
