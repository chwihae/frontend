import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { addVote, cancelVote } from '@/apis/vote';
import { ReactComponent as IConClockBlack } from '@/assets/icon_clock_black.svg';
import useTimer from '@/hooks/useTimer';
import useVoteQuery from '@/hooks/useVoteQuery';
import Statistics from '@components/common/Statistics';

const Contents = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  const { pollPost, pollOptions } = useVoteQuery(postId);
  const [optionId, setOptionId] = useState<number>(0);

  const { mutate: chooseOptMutation } = useMutation({
    mutationFn: () => addVote(postId, optionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['voteSingle', postId]);
      queryClient.invalidateQueries(['voteOptions', postId]);
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: () => cancelVote(postId, pollOptions?.votedOptionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['voteSingle', postId]);
      queryClient.invalidateQueries(['voteOptions', postId]);
    },
  });

  // 타이머
  const future = pollPost?.closeAt || '';
  const timer = useTimer(future);

  //옵션선택
  const handleChooseOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    setOptionId(id);
    chooseOptMutation();
  };

  //재투표
  const handleRevoteBtn = () => {
    deleteMutation();
  };
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
          <div className="flex items-center gap-1">
            <IConClockBlack />
            <span className="scoremedium12">{timer} 남음</span>
          </div>
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
                  className={`notosansregular14 flex h-14 w-[343px]  items-center rounded-[10px] ${
                    pollOptions?.showVoteCount === false
                      ? 'border-[1px] border-GS6 px-4'
                      : ''
                  }${
                    pollOptions?.votedOptionId !== null || pollPost?.editable
                      ? 'cursor-no-drop'
                      : 'cursor-pointer'
                  }`}
                >
                  <input
                    type="radio"
                    name={`${postId}-option`}
                    value={option.id}
                    className="hidden"
                    disabled={pollOptions?.showVoteCount === true}
                    onChange={handleChooseOption}
                  />
                  <span className="absolute left-4">{option.name}</span>
                  {pollOptions?.showVoteCount && (
                    <>
                      <progress
                        max={pollPost?.voteCount}
                        value={option?.voteCount}
                        className={`resultsProgress h-14 w-[343px] ${
                          pollPost?.status === 'COMPLETED'
                            ? 'cursor-no-drop'
                            : ''
                        }`}
                      ></progress>
                      <span className="notosansmedium14 absolute right-4">
                        {(pollPost &&
                          Math.round(
                            (option.voteCount / pollPost?.voteCount) * 100,
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
            총 투표수 {pollPost?.voteCount} 개
          </div>
        )}
        {/* 통계치 */}
        {pollPost && (
          <Statistics
            viewCount={pollPost?.viewCount}
            commentCount={pollPost?.commentCount}
            bookmarkCount={pollPost?.bookmarkCount}
          />
        )}
      </div>
    </section>
  );
};

export default Contents;
