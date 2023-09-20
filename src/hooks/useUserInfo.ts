import { useEffect, useState } from 'react';

import { getUserInfo } from '@/apis/auth';
import type { IUser } from '@/types/authType';

const useUserInfo = () => {
  const [user, setUser] = useState<IUser>();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(accessToken);
      setUser(data?.data);
    };
    fetchData();
  }, [accessToken]);

  return user;
};

export default useUserInfo;
