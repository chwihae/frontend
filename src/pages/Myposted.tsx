// import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

// import { getUserPostInfo } from '@/apis/mypage';
// import type { IVoteOptionsRes, IVoteSingleRes } from '@/types/voteType';

const Myposted = () => {
  const location = useLocation();
  console.log(location);

  // const useUserPostQuery = (postId: number) => {
  //   // 투표글 데이터 가져오기
  //   const { data: postList } = useQuery<IVoteSingleRes>({
  //     queryKey: ['userpostList', location],
  //     queryFn: () => getVoteSingle(postId),
  //   });

  //   return { postList };
  // };

  return <></>;
};

export default Myposted;
