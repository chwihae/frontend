import { ReactComponent as IConLevelOne } from '@/assets/char_level1.svg';
import { ReactComponent as IConLevelTwo } from '@/assets/char_level2.svg';
import { ReactComponent as IConLevelThree } from '@/assets/char_level3.svg';
import { ReactComponent as IConLevelFour } from '@/assets/char_level4.svg';
import getLocalData from '@/utils/getLocalData';

const LevelImage = ({ className }: { className: string }) => {
  const userLevel = getLocalData('userLevel');

  const LEVEL = [
    {
      type: 'BACHELOR',
      img: <IConLevelOne className={`${className}`} />,
    },
    {
      type: 'MASTER',
      img: <IConLevelTwo className={`${className}`} />,
    },
    {
      type: 'DOCTOR',
      img: <IConLevelThree className={`${className}`} />,
    },
    {
      type: 'PROFESSOR',
      img: <IConLevelFour className={`${className}`} />,
    },
  ];

  return <>{LEVEL.find((item) => item.type === userLevel?.type)?.img}</>;
};

export default LevelImage;
