import type { IVoteAllReq } from '@/types/voteType';

import { auth } from './axios';

// 사용자 질문 리스트 조회
export const getUserPostInfo = async ({
  type = '',
  page = 0,
  size = 10,
}: IVoteAllReq) => {
  try {
    const { data } = await auth.get(
      `/api/v1/users/questions?type=${type}&page=${page}&size=${size}`,
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
