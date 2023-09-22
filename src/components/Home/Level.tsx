import { useEffect } from 'react';

import { getUserLevel } from '@/apis/auth';
import { ReactComponent as IConCommentOrange } from '@/assets/icon_comment_orange.svg';
import { ReactComponent as IConVoteOrange } from '@/assets/icon_voterate_orange.svg';
import { LEVELSTEP } from '@/constants/home';
import getLocalData from '@/utils/getLocalData';
import LevelImage from '@components/common/LevelImage';

const Level = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserLevel();
      return res;
    };
    fetchData();
  }, []);

  // 등급 이름
  const userLevel = getLocalData('userLevel');
  const userLevelName = LEVELSTEP.find(
    (level) => level.type === userLevel?.level,
  );

  const turnout =
    userLevelName &&
    Math.round((userLevel?.voteCount / userLevelName?.goalVotes) * 100);
  const commentRate =
    userLevelName &&
    Math.round((userLevel?.commentCount / userLevelName?.goalComments) * 100);

  return (
    <section className="relative flex h-[229px] flex-col">
      <div>
        <LevelImage className="absolute right-[21.56px] top-[44.32px] h-[121px] w-[156px]" />
      </div>
      <div className="ml-[16px] mt-[41px] w-[180px]">
        <p className="scorebold24 right-0 flex flex-col text-right">
          <span>나의 등급은</span>
          <span className="mb-[15px] translate-y-[-5px] text-prime1">
            {userLevelName && userLevelName?.name} 별랑이!
          </span>
          <span className="scoreregular12 mb-2 text-GS2 ">다음 등급까지</span>
        </p>
        <div className="scoremedium12 w-full text-GS3">
          <div className="mb-[7px] flex w-full justify-between">
            <IConVoteOrange className="w-4" />
            <progress
              max="100"
              value={turnout}
              className="rateProgress"
            ></progress>
            <span>{turnout}%</span>
          </div>
          <div className="flex w-full justify-between">
            <IConCommentOrange className="w-4" />
            <progress
              max="100"
              value={commentRate}
              className="rateProgress"
            ></progress>
            <span>{commentRate}%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Level;
