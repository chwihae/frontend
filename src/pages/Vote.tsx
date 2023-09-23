import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getVoteOption, getVoteSingle } from '@/apis/question';
import { ReactComponent as IConClockBlack } from '@/assets/icon_clock_black.svg';
import useTimer from '@/hooks/useTimer';
import type { IVoteOptionsRes, IVoteSingleRes } from '@/types/voteType';
import Statistics from '@components/common/Statistics';

const Vote = () => {
  // 투표글 아이디
  const params = useParams();
  const id = Number(params.id);

  // 투표글 데이터
  const [pollPost, setPollPost] = useState<IVoteSingleRes>();
  const [pollOptions, setPollOptions] = useState<IVoteOptionsRes>();

  useEffect(() => {
    const fetchVoteSingle = async () => {
      const res = await getVoteSingle(id);
      setPollPost(res?.data);
    };
    fetchVoteSingle();

    const fetchVoteOptions = async () => {
      const res = await getVoteOption(id);
      setPollOptions(res?.data);
    };
    fetchVoteOptions();
  }, [id]);

  // 타이머
  const future = pollPost?.closeAt || '';
  const timer = useTimer(future);

  //옵션선택
  const handleChooseOption = () => {};

  return (
    <div>
      <section>
        <span>
          {pollPost?.status === 'IN_PROGRESS' ? '해결중' : '해결완료'}
        </span>
        <h2>{pollPost?.title}</h2>
        <p>{pollPost?.content}</p>
      </section>
      <section>
        {/* 마감시간 */}
        <div className="flex items-center gap-1">
          <IConClockBlack />
          <span>{timer} 남음</span>
        </div>
        {/* 투표항목 */}
        <ul>
          {pollOptions?.options.map((option) => (
            <label key={option.id}>
              {option.name}
              <input
                type="radio"
                name={`id-${id}-option`}
                value={option.name}
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
      </section>
    </div>
  );
};

export default Vote;
