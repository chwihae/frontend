import { questionAll } from '@/mock/mockData';

import { auth } from './axios';

// 질문 전체조회
export const getQuestionAll = async () => {
  try {
    const { data } = await questionAll();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 질문 단건조회

export const getQuestionSingle = async (id: string) => {
  try {
    const { data } = await auth.get(id);
    return data;
  } catch (error) {
    console.error(error);
  }
};
