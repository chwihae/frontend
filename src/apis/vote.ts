import { auth } from './axios';

// 투표 등록
export const addVote = async (questionId: number, optionId: number) => {
  try {
    const { data } = await auth.post(
      `/api/v1/questions/${questionId}/options/${optionId}`,
    );
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 투표 취소
export const deleteVote = async (questionId: number, optionId: number) => {
  try {
    const { data } = await auth.delete(
      `/api/v1/questions/${questionId}/options/${optionId}`,
    );
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
