import { questionAll } from '@/mock/mockData';

// 질문 전체조회
export const getQuestionAll = async () => {
  try {
    const { data } = await questionAll();
    return data;
  } catch (error) {
    console.error(error);
  }
};
