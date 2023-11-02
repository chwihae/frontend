import { useEffect, useState } from 'react';

import { getUserLevel } from '@/apis/auth';
import { ReactComponent as IConCommentOrange } from '@/assets/icon_comment_orange.svg';
import { ReactComponent as IConVoteOrange } from '@/assets/icon_voterate_orange.svg';
import type { IUserLevel } from '@/types/authType';
import LevelImage from '@components/common/LevelImage';

const Level = () => {
  const [userLevel, setUserLevel] = useState<IUserLevel>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserLevel();
      setUserLevel(res);
    };
    fetchData();
  }, []);

  const calcRate = (count: number | undefined, goal: number | undefined) => {
    if (count !== undefined && goal !== undefined) {
      return Math.round((count / goal) * 100);
    }
    return 0;
  };

  const turnout = calcRate(userLevel?.voteCount, userLevel?.goalVotes);
  const commentRate = calcRate(
    userLevel?.commentCount,
    userLevel?.goalComments,
  );

  return (
    <section className="relative flex h-[229px] flex-col">
      <div>
        <LevelImage className="absolute right-[21.56px] top-[44.32px] h-[139px] w-[156px]" />
      </div>
      <div className="ml-[16px] mt-[41px] w-[180px]">
        <p className="right-0 flex flex-col text-right score-bold24">
          <span>나의 등급은</span>
          <span className="mb-[15px] translate-y-[-5px] text-prime1">
            {userLevel && userLevel?.name} 별랑이!
          </span>
          <span className="mb-2 text-GS2 score-regular12 ">다음 등급까지</span>
        </p>
        <div className="w-full text-GS3 score-medium12">
          <div className="mb-[7px] flex w-full justify-between">
            <IConVoteOrange className="w-4" />
            <progress max="100" value={turnout} className="rateProgress" />
            {turnout && (
              <span className="min-w-[34px] text-right">
                {turnout > 100 ? 100 : turnout}%
              </span>
            )}
          </div>
          <div className="flex w-full justify-between">
            <IConCommentOrange className="w-4" />
            <progress max="100" value={commentRate} className="rateProgress" />
            {commentRate && (
              <span className="min-w-[34px] text-right">
                {commentRate > 100 ? 100 : commentRate}%
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Level;
