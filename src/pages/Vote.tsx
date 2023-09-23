import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getVoteOption, getVoteSingle } from '@/apis/question';
import { addVote } from '@/apis/vote';
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

  useEffect(() => {
    const fetchVoteSingle = async () => {
      const res = await getVoteSingle(postId);
      setPollPost(res?.data);
      console.log(res?.data);
    };
    fetchVoteSingle();

    const fetchVoteOptions = async () => {
      const res = await getVoteOption(postId);
      setPollOptions(res?.data);
    };
    fetchVoteOptions();
  }, [postId]);

  // 타이머
  const future = pollPost?.closeAt || '';
  const timer = useTimer(future);

  //옵션선택
  const handleChooseOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = Number(e.target.value);

    const postData = async (optid: number) => {
      const res = await addVote(postId, optid);
      console.log(res);
    };
    postData(optionId);
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
          {/* 마감시간 */}
          <div className="mb-3 flex items-center gap-1">
            <IConClockBlack />
            <span className="scoremedium12">{timer} 남음</span>
          </div>
          {/* 투표항목 */}
          <ul className="mb-[46px] flex flex-col gap-3">
            {pollOptions?.options
              .sort((a, b) => a.id - b.id)
              .map((option) => (
                <label
                  key={option.id}
                  className="notosansmedium14 flex h-14 w-[343px] items-center rounded-[10px] border-[1px] border-GS6 px-4"
                >
                  {option.name}
                  <input
                    type="radio"
                    name={`${postId}-option`}
                    value={option.id}
                    className="hidden"
                    onChange={handleChooseOption}
                  />
                </label>
              ))}
          </ul>
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
