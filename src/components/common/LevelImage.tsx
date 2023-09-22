import { Link } from 'react-router-dom';

import { ReactComponent as IConLevelOne } from '@/assets/char_level1.svg';
import { ReactComponent as IConLevelTwo } from '@/assets/char_level2.svg';
import { ReactComponent as IConLevelThree } from '@/assets/char_level3.svg';
import { ReactComponent as IConLevelFour } from '@/assets/char_level4.svg';
import useUserInfo from '@/hooks/useUserInfo';

const LevelImage = ({ className }: { className: string }) => {
  const user = useUserInfo();

  const LEVEL = [
    {
      level: '학사',
      img: <IConLevelOne className={`${className}`} />,
    },
    {
      level: '석사',
      img: <IConLevelTwo className={`${className}`} />,
    },
    {
      level: '박사',
      img: <IConLevelThree className={`${className}`} />,
    },
    {
      level: '교사',
      img: <IConLevelFour className={`${className}`} />,
    },
  ];

  return (
    <Link className="flex items-center" to="/mypage">
      {LEVEL.find((item) => item.level === user?.level)?.img}
    </Link>
  );
};

export default LevelImage;
