import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUserInfo } from '@/apis/auth';
import { ReactComponent as IConLevelFour } from '@/assets/levelfour.svg';
import { ReactComponent as IConLevelOne } from '@/assets/levelone.svg';
import { ReactComponent as IConLevelThree } from '@/assets/levelthree.svg';
import { ReactComponent as IConLevelTwo } from '@/assets/leveltwo.svg';
import type { IUser } from '@/types/authType';

const Level = () => {
  const [user, setUser] = useState<IUser>();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(accessToken);
      setUser(data?.data);
    };
    fetchData();
  }, [accessToken]);

  const LEVEL = [
    { level: '학사', img: <IConLevelOne className="h-24 w-24" /> },
    { level: '석사', img: <IConLevelTwo className="h-24 w-24" /> },
    { level: '박사', img: <IConLevelThree className="h-24 w-24" /> },
    { level: '교사', img: <IConLevelFour className="h-24 w-24" /> },
  ];

  return (
    <section className="flex h-1/3 flex-col items-center justify-center gap-4">
      <Link className="h-24 w-24" to="/mypage">
        {LEVEL.find((item) => item.level === user?.level)?.img}
      </Link>
      <p className="text-xl">나는 {user?.level} 별랑이!</p>
      <div className="flex w-full justify-center gap-2">
        <span className="bg-orange-400">아이콘</span>
        <div className="h-6 w-4/6 bg-orange-400">투표 프로그레스바</div>
      </div>
      <div className="flex w-full justify-center gap-2">
        <span className="bg-orange-400">아이콘</span>
        <div className="h-6 w-4/6 bg-orange-400">댓글 프로그레스바</div>
      </div>
    </section>
  );
};

export default Level;
