import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getVoteOption, getVoteSingle } from '@/apis/question';
import { addVote, deleteVote } from '@/apis/vote';
import { ReactComponent as IConClockBlack } from '@/assets/icon_clock_black.svg';
import useTimer from '@/hooks/useTimer';
import type { IVoteOptionsRes, IVoteSingleRes } from '@/types/voteType';
import Statistics from '@components/common/Statistics';

const Vote = () => {
  // 투표글 아이디
  const params = useParams();
  const postId = Number(params.id);

  // 투표글 데이터
  const [pollPost, setPollPost] = useState<IVoteSingleRes>();
  const [pollOptions, setPollOptions] = useState<IVoteOptionsRes>();

  const fetchVoteSingle = async () => {
    const res = await getVoteSingle(postId);
    setPollPost(res?.data);
    console.log(res?.data);
  };

  const fetchVoteOptions = async () => {
    const res = await getVoteOption(postId);
    setPollOptions(res?.data);
  };

  useEffect(() => {
    fetchVoteSingle();
    fetchVoteOptions();
    console.log(pollOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // 타이머
  const future = pollPost?.closeAt || '';
  const timer = useTimer(future);

  //옵션선택
  const handleChooseOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = Number(e.target.value);
    // console.log(optionId);

    const postData = async (optid: number) => {
      console.log(postId, optid);
      if (pollOptions) {
        const res = await addVote(postId, optid);
        if (res.code !== 201) {
          fetchVoteOptions();
        }
      }
    };
    postData(optionId);
  };

  //재투표
  const handleRevoteBtn = () => {
    pollOptions && deleteVote(postId, pollOptions.votedOptionId);
  };

  // console.log(pollOptions);

  return (
    <div>
      {/* 본문 */}
      <section className="mt-10 border-b-[10px] border-b-bg px-4 pb-6">
        {/* 글 내용 */}
        <div className="mb-[49px]">
          <div className="scoremedium14 mb-6 w-fit rounded-[37px] border-[1px] border-GS6 px-3 py-[6px] text-GS4">
            {pollPost?.status === 'IN_PROGRESS' ? '해결중' : '해결완료'}
          </div>
          <h2 className="notosansbold16 mb-3">{pollPost?.title}</h2>
          <p className="notosansregular16">{pollPost?.content}</p>
        </div>
        {/* 투표항목 */}
        <div>
          <div className="scoremedium12 mb-3 flex items-center justify-between text-GS3 ">
            <div className="flex items-center gap-1">
              <IConClockBlack />
              <span className="scoremedium12">{timer} 남음</span>
            </div>
            {pollOptions?.showVoteCount && (
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
          <ul className="relative mb-2 flex flex-col gap-3">
            {pollOptions?.options
              .sort((a, b) => a.id - b.id)
              .map((option) => (
                <label
                  key={option.id}
                  className={`notosansregular14 flex h-14 w-[343px] items-center rounded-[10px]   ${
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
                    disabled={pollOptions?.showVoteCount === true}
                    onChange={handleChooseOption}
                  />
                  <span className="absolute left-4">{option.name}</span>
                  {pollOptions?.showVoteCount && (
                    <>
                      <progress
                        max={pollPost?.voteCount}
                        value={option?.voteCount}
                        className="resultsProgress h-14 w-[343px]"
                      ></progress>
                      <span className="notosansmedium14 absolute right-4">
                        {pollPost &&
                          Math.round(
                            (option?.voteCount / pollPost?.voteCount) * 100,
                          )}
                        %
                      </span>
                    </>
                  )}
                </label>
              ))}
          </ul>
          {pollOptions?.showVoteCount && (
            <div className="scoreregular12 mb-[46px] text-right text-GS4 ">
              투표수 {pollPost?.voteCount}
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
      {/* 댓글 */}
      <section></section>
    </div>
  );
};

export default Vote;
