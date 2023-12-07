import { useLocation } from 'react-router-dom';

import { ReactComponent as IConLevelOne } from '@/assets/char_level1.svg';
import { ReactComponent as IConLevelOneRoundedLarge } from '@/assets/char_level1_round_100.svg';
import { ReactComponent as IConLevelTwo } from '@/assets/char_level2.svg';
import { ReactComponent as IConLevelTwoRoundedLarge } from '@/assets/char_level2_round_100.svg';
import { ReactComponent as IConLevelThree } from '@/assets/char_level3.svg';
import { ReactComponent as IConLevelThreeRoundedLarge } from '@/assets/char_level3_round_100.svg';
import { ReactComponent as IConLevelFour } from '@/assets/char_level4.svg';
import { ReactComponent as IConLevelFourRoundedLarge } from '@/assets/char_level4_round_100.svg';
import getLocalData from '@/utils/getLocalData';

const LevelImage = ({ className }: { className: string }) => {
  const location = useLocation();
  const { pathname } = location;

  const userLevel = getLocalData('userLevel');

  const LEVEL = [
    {
      type: 'BACHELOR',
      mainImg: <IConLevelOne className={`${className}`} />,
      mypageImg: <IConLevelOneRoundedLarge className={`${className}`} />,
    },
    {
      type: 'MASTER',
      mainImg: <IConLevelTwo className={`${className}`} />,
      mypageImg: <IConLevelTwoRoundedLarge className={`${className}`} />,
    },
    {
      type: 'DOCTOR',
      mainImg: <IConLevelThree className={`${className}`} />,
      mypageImg: <IConLevelThreeRoundedLarge className={`${className}`} />,
    },
    {
      type: 'PROFESSOR',
      mainImg: <IConLevelFour className={`${className}`} />,
      mypageImg: <IConLevelFourRoundedLarge className={`${className}`} />,
    },
  ];

  const filteredUserLevel = LEVEL.find((item) => item.type === userLevel?.type);
  const userLevelImage =
    pathname === '/home'
      ? filteredUserLevel?.mainImg
      : filteredUserLevel?.mypageImg;

  return <>{userLevelImage}</>;
};

export default LevelImage;
