import { useEffect, useState } from 'react';

import { getUserInfo } from '@/apis/auth';
import type { IUser } from '@/types/authType';

const useUserInfo = () => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      setUser(data?.data);
    };
    fetchData();
  }, []);

  return user;
};

export default useUserInfo;
