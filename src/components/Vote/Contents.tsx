import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { addVote, bookmarked, cancelVote } from '@/apis/vote';
import { ReactComponent as IConClockBlack } from '@/assets/icon_clock_black.svg';
import { ReactComponent as IConViewCountGray } from '@/assets/icon_viewCount_gray.svg';
import { useIsBottomSheetContext } from '@/contexts/IsBottomSheetProvider';
import useTimer from '@/hooks/useTimer';
import useVoteQuery from '@/hooks/useVoteQuery';
import BottomSheet from '@components/common/BottomSheet';
import Toast from '@components/common/Toast';

const Contents = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  const { pollPost, pollOptions } = useVoteQuery(postId);
  const [optionId, setOptionId] = useState<number>(0);
  const [toastDenied, setToastDenied] = useState<boolean>(false);

  // console.log(pollOptions);

  const { mutate: chooseOptMutation } = useMutation({
    mutationFn: () => addVote(postId, optionId),
    onSuccess: () => {
      // queryClient.invalidateQueries(['voteSingle', postId]);
      queryClient.invalidateQueries(['voteOptions', postId]);
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: () => cancelVote(postId, pollOptions?.votedOptionId),
    onSuccess: () => {
      // queryClient.invalidateQueries(['voteSingle', postId]);
      queryClient.invalidateQueries(['voteOptions', postId]);
    },
  });

  const sumOptionVoteCount = pollOptions?.options
    .map((item) => item.voteCount)
    .reduce((prev, curr) => prev + curr, 0);

  // 타이머
  const future = pollPost?.closeAt || '';
  const timer = useTimer(future);

  // 옵션선택
  const handleChooseOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pollPost?.editable) {
      return setToastDenied(true);
    }

    const id = Number(e.target.value);
    setOptionId(id);
    chooseOptMutation();
  };

  // console.log(pollOptions);

  // 재투표
  const handleRevoteBtn = () => {
    deleteMutation();
  };

  // 북마크
  const { mutate: bookmarkMutation } = useMutation({
    mutationFn: () => bookmarked(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['voteSingle', postId]);
    },
  });

  const handleBookMarked = () => {
    bookmarkMutation();
  };

  // 투표삭제
  const { isBottomSheetOpen } = useIsBottomSheetContext();

  return (
    <section className="scorebold16 mt-10 border-b-[10px] border-b-bg px-4 pb-6">
      {/* 글 내용 */}
      <div className="mb-[49px]">
        <span className="scoremedium14 mb-6 flex w-fit items-center rounded-[37px] border-[1px] border-GS6 px-3 py-[6px] text-GS4">
          {pollPost?.status === 'IN_PROGRESS' ? '해결중' : '해결완료'}
        </span>
        <h2 className="notosansbold16 mb-3">{pollPost?.title}</h2>
        <p className="notosansregular16">{pollPost?.content}</p>
      </div>
      {/* 투표바, 수치 */}
      <div>
        <div className="scoremedium12 mb-3 flex items-center justify-between text-GS3 ">
          {pollPost?.status === 'IN_PROGRESS' && (
            <div className="flex items-center gap-1">
              <IConClockBlack />
              <span className="scoremedium12">{timer} 남음</span>
            </div>
          )}
          {pollPost?.editable === false &&
            pollPost?.status === 'IN_PROGRESS' &&
            pollOptions?.showVoteCount && (
              <button
                type="button"
                className="scoremedium12"
                onClick={handleRevoteBtn}
              >
                다시 투표 하기
              </button>
            )}
        </div>
        {/* 투표항목 */}
        <ul
          className={`relative ${
            pollOptions?.showVoteCount ? 'mb-2' : 'mb-[46px]'
          } flex flex-col gap-3`}
        >
          {pollOptions?.options
            .sort((a, b) => a.id - b.id)
            .map((option) => (
              <li key={option.id}>
                <label
                  className={`notosansregular14 flex h-14 w-[343px] cursor-pointer items-center rounded-[10px] ${
                    pollOptions?.showVoteCount === false
                      ? 'border-[1px] border-GS6 px-4'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`${postId}-option`}
                    value={option.id}
                    className="hidden"
                    disabled={pollOptions?.votedOptionId !== null}
                    onChange={handleChooseOption}
                  />
                  <span
                    className={`absolute left-4 ${
                      pollOptions.votedOptionId === option.id && 'text-prime1'
                    }`}
                  >
                    {option.name}
                  </span>
                  {pollOptions?.showVoteCount && (
                    <>
                      <progress
                        max={sumOptionVoteCount}
                        value={option?.voteCount}
                        className={`resultsProgress h-14 w-[343px] ${
                          pollPost?.status === 'COMPLETED' && 'cursor-no-drop'
                        } ${
                          pollOptions.votedOptionId === option.id &&
                          'resultsProgress_voted'
                        }`}
                      />
                      <span
                        className={`notosansmedium14 absolute right-4 ${
                          pollOptions.votedOptionId === option.id &&
                          'text-prime1'
                        }`}
                      >
                        {(sumOptionVoteCount &&
                          Math.round(
                            (option.voteCount / sumOptionVoteCount) * 100,
                          )) ||
                          0}
                        %
                      </span>
                    </>
                  )}
                </label>
              </li>
            ))}
        </ul>
        {pollOptions?.showVoteCount && (
          <div className="scoreregular12 mb-[46px] text-right text-GS4 ">
            투표 수 {sumOptionVoteCount}
          </div>
        )}
        {/* 통계치 */}
        {pollPost && (
          <div className="flex justify-between">
            <p className="scoreregular12 flex items-center gap-1 text-GS4">
              <IConViewCountGray />
              {pollPost?.viewCount}명이 봤어요
            </p>
            {!pollPost?.editable && (
              <button
                type="button"
                className={`scoremedium12 flex gap-1 rounded-[37px] border-[1px]  px-[9px] py-1  ${
                  pollPost.bookmarked
                    ? 'border-prime1 text-prime1'
                    : 'border-GS6 text-GS4'
                }`}
                onClick={handleBookMarked}
              >
                <span>저장</span>
                <span>{pollPost?.bookmarkCount}</span>
              </button>
            )}
          </div>
        )}
      </div>
      {toastDenied && (
        <Toast
          text="내가 쓴 글에는 투표할 수 없어요"
          setToast={setToastDenied}
        />
      )}
      {isBottomSheetOpen && (
        <BottomSheet
          modalId="bottomSheet-voteEdit-modal"
          isInProgress={pollPost?.status === 'IN_PROGRESS'}
          listArray={['글 수정', '글 삭제']}
        />
      )}
    </section>
  );
};

export default Contents;
