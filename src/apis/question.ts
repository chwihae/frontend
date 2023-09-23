import type { IQuestion } from '@/types/questionType';
import type { IVoteAllReq } from '@/types/voteType';
import nowIsoTime from '@/utils/nowIsoTime';

import { auth } from './axios';

// 질문 등록
export const addQuestion = async (questions: IQuestion) => {
  try {
    const { closeAt, ...rest } = questions;

    const converData = {
      closeAt: nowIsoTime(closeAt),
      ...rest,
    };

    console.log(converData);

    const { data } = await auth.post('/api/v1/questions', converData);

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 투표 전체조회
export const getVoteAll = async ({
  type = '',
  status = '',
  page = 0,
  size = 10,
}: IVoteAllReq) => {
  try {
    const { data } = await auth.get(
      `/api/v1/questions?type=${type}&status=${status}&page=${page}&size=${size}`,
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

// 투표 단건조회
export const getVoteSingle = async (id: number) => {
  try {
    const { data } = await auth.get(`/api/v1/questions/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 투표 옵션조회
export const getVoteOption = async (id: number) => {
  try {
    const { data } = await auth.get(`/api/v1/questions/${id}/options`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
