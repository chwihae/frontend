import { ReactComponent as IConLevelOne } from '@/assets/char_level1.svg';
import { ReactComponent as IConLevelTwo } from '@/assets/char_level2.svg';
import { ReactComponent as IConLevelThree } from '@/assets/char_level3.svg';
import { ReactComponent as IConLevelFour } from '@/assets/char_level4.svg';
import getLocalData from '@/utils/getLocalData';

const LevelImage = ({ className }: { className: string }) => {
  const userLevel = getLocalData('userLevel');

  const LEVEL = [
    {
      level: 'BACHELOR',
      img: <IConLevelOne className={`${className}`} />,
    },
    {
      level: 'MASTER',
      img: <IConLevelTwo className={`${className}`} />,
    },
    {
      level: 'DOCTOR',
      img: <IConLevelThree className={`${className}`} />,
    },
    {
      level: 'PROFESSOR',
      img: <IConLevelFour className={`${className}`} />,
    },
  ];

  return <>{LEVEL.find((item) => item.level === userLevel?.level)?.img}</>;
};

export default LevelImage;
