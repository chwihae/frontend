import { voteAll } from '@/mock/mockData';

// 질문 전체조회
export const getVoteAll = async () => {
  try {
    const { data } = await voteAll();
    return data;
  } catch (error) {
    console.error(error);
  }
};
