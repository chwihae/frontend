import { questionAll } from '@/mock/mockData';
import type { IQuestion } from '@/types/questionType';
import formatDate from '@/utils/formatDate';

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

// 질문 등록
export const addQuestion = async (questions: IQuestion) => {
  // try {
  //   const { data } = await auth.post('/api/v1/questions', questions);
  //   console.log(data);
  //   return data;
  // } catch (error) {
  //   console.error(error);
  // }
  const data = {
    id: 25,
  };

  const { closeAt, ...rest } = questions;
  const converData = {
    closeAt: formatDate(Number(closeAt)),
    ...rest,
  };
  console.log('질문등록 request', converData);
  return data;
};
