import type { IQuestion } from '@/types/questionType';
import type {
  IResponse,
  IVoteAllReq,
  IVoteOptionsRes,
  IVoteSingleRes,
} from '@/types/voteType';
import formatDate from '@/utils/formatDate';

import { auth } from './axios';

// 질문 등록
export const addQuestion = async (questions: IQuestion) => {
  try {
    const { closeAt, ...rest } = questions;
    const converData = {
      closeAt: formatDate(Number(closeAt)),
      ...rest,
    };
    const { data } = await auth.post('/api/v1/questions', converData);
    console.log(data);

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
export const getVoteSingle = async (id: string) => {
  try {
    const { data }: IResponse<IVoteSingleRes> = await auth.get(
      `/api/v1/questions/${id}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 투표 옵션조회
export const getVoteOption = async (id: string) => {
  try {
    const { data }: IResponse<IVoteOptionsRes> = await auth.get(
      `/api/v1/questions/${id}/options`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
