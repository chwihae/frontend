import { useEffect, useState } from 'react';

import { getUserLevel } from '@/apis/auth';
import { ReactComponent as IConLevelOneRounded } from '@/assets/char_level1_round.svg';
import { ReactComponent as IConLevelOneRoundedLarge } from '@/assets/char_level1_round_100.svg';
import { ReactComponent as IConLevelTwoRounded } from '@/assets/char_level2_round.svg';
import { ReactComponent as IConLevelTwoRoundedLarge } from '@/assets/char_level2_round_100.svg';
import { ReactComponent as IConLevelThreeRounded } from '@/assets/char_level3_round.svg';
import { ReactComponent as IConLevelThreeRoundedLarge } from '@/assets/char_level3_round_100.svg';
import { ReactComponent as IConLevelFourRounded } from '@/assets/char_level4_round.svg';
import { ReactComponent as IConLevelFourRoundedLarge } from '@/assets/char_level4_round_100.svg';
import { ReactComponent as IconArrowBottomGray } from '@/assets/icon_arrow_bottom_gray.svg';
import { LEVELSTEP } from '@/constants/home';
import type { IUserLevel } from '@/types/authType';
import getLocalData from '@/utils/getLocalData';

const Mylevel = () => {
  const [accordionStates, setAccordionStates] = useState(
    new Array(LEVELSTEP.length).fill(false),
  );
  const [userLevel, setUserLevel] = useState<IUserLevel>();

  const toggleAccordion = (index: number) => {
    setAccordionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const userId = getLocalData('userId');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserLevel();
      setUserLevel(res);
    };
    fetchData();
  }, []);

  const LEVEL_IMAGE = [
    {
      name: '학사',
      imgSmall: <IConLevelOneRounded />,
      imgLarge: <IConLevelOneRoundedLarge />,
    },
    {
      name: '석사',
      imgSmall: <IConLevelTwoRounded />,
      imgLarge: <IConLevelTwoRoundedLarge />,
    },
    {
      name: '박사',
      imgSmall: <IConLevelThreeRounded />,
      imgLarge: <IConLevelThreeRoundedLarge />,
    },
    {
      name: '교수',
      imgSmall: <IConLevelFourRounded />,
      imgLarge: <IConLevelFourRoundedLarge />,
    },
  ];

  return (
    <div className="pt-10">
      <section className="mb-10 flex flex-col items-center gap-6 px-4">
        <div className="flex flex-col items-center">
          {LEVEL_IMAGE.find((img) => img.name === userLevel?.name)?.imgLarge}
          <h2 className="score-bold16">별랑이 {userId}</h2>
        </div>
        <ul className="h-[70px] w-full rounded-[10px] border-[1px] border-GS6 p-[11px] text-GS4 score-medium14">
          <div className="flex h-full translate-x-[-14px] items-center justify-center">
            <li className="flex flex-col items-center gap-1 border-r-[1px] border-[#cecece] pr-5">
              <span>투표 활동</span>
              <span className="text-prime1">{userLevel?.voteCount}</span>
            </li>
            <li className="flex flex-col items-center gap-1 pl-5">
              <span>댓글</span>
              <span className="text-prime1">{userLevel?.commentCount}</span>
            </li>
          </div>
        </ul>
      </section>
      <section className="pb-20">
        <h3 className="px-4 pb-6 score-bold16">별랑이 성장기</h3>
        <ul className="flex flex-col score-medium14">
          {LEVELSTEP.map((level, index) => {
            const nextLevelStep = LEVELSTEP[index - 1];
            return (
              <li
                key={level.name}
                className={`${accordionStates[index] && 'bg-bg'} p-4`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center gap-2 ">
                    <span className="block h-10 w-10">
                      {
                        LEVEL_IMAGE.find((img) => img.name === level?.name)
                          ?.imgSmall
                      }
                    </span>
                    <span>{level.name} 별랑이</span>
                  </div>
                  <IconArrowBottomGray
                    className={`transform ${
                      accordionStates[index] ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {accordionStates[index] && (
                  <div className="ml-[47px] pt-2 text-GS3">
                    <h4>💡등급 조건</h4>
                    <ul className="scoreregular14 pl-9">
                      <li className="list-disc">
                        투표 수 {nextLevelStep ? nextLevelStep.goalVotes : 0}{' '}
                        이상
                      </li>
                      <li className="list-disc">
                        댓글 수 {nextLevelStep ? nextLevelStep.goalComments : 0}{' '}
                        이상
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Mylevel;
