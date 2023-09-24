import { auth } from './axios';

// 투표 등록
export const addVote = async (questionId: number, optionId: number) => {
  try {
    const { data } = await auth.post(
      `/api/v1/questions/${questionId}/options/${optionId}`,
    );
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
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 댓글 생성
export const addComment = async (questionId: number, comment: string) => {
  try {
    const { data } = await auth.post(
      `/api/v1/questions/${questionId}/comments`,
      {
        content: comment,
      },
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 댓글 조회
export const getComment = async (questionId: number) => {
  try {
    const { data } = await auth.get(
      `/api/v1/questions/${questionId}/comments?page=0&size=10`,
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
