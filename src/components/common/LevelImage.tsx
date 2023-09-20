import { Link } from 'react-router-dom';

import { ReactComponent as IConLevelFour } from '@/assets/levelfour.svg';
import { ReactComponent as IConLevelOne } from '@/assets/levelone.svg';
import { ReactComponent as IConLevelThree } from '@/assets/levelthree.svg';
import { ReactComponent as IConLevelTwo } from '@/assets/leveltwo.svg';
import useUserInfo from '@/hooks/useUserInfo';

const LevelImage = ({ className }: { className: string }) => {
  const user = useUserInfo();

  const LEVEL = [
    {
      level: '학사',
      img: <IConLevelOne className={`${className} rounded-full bg-rose-400`} />,
    },
    {
      level: '석사',
      img: <IConLevelTwo className={`${className} rounded-full bg-rose-400`} />,
    },
    {
      level: '박사',
      img: (
        <IConLevelThree className={`${className} rounded-full bg-rose-400`} />
      ),
    },
    {
      level: '교사',
      img: (
        <IConLevelFour className={`${className} rounded-full bg-rose-400`} />
      ),
    },
  ];

  return (
    <Link className="flex items-center" to="/mypage">
      {LEVEL.find((item) => item.level === user?.level)?.img}
    </Link>
  );
};

export default LevelImage;
