import { useQuery } from '@tanstack/react-query';

import { getUserLevel } from '@/apis/auth';

const useUserLevelQuery = () => {
  const { data: userLevel } = useQuery({
    queryKey: ['userLevel'],
    queryFn: () => getUserLevel(),
    suspense: true,
  });
  return { userLevel };
};

export default useUserLevelQuery;
