/* eslint-disable no-console */
import type {
  ICommentDelete,
  ICommentEdit,
  ICommentGetReq,
  ICommentReq,
} from '@/types/voteType';

import { auth } from './axios';

// 투표 등록
export const addVote = async (questionId: number, optionId: number) => {
  const { data } = await auth.post(
    `/api/v1/questions/${questionId}/options/${optionId}`,
  );
  return data;
};

// 투표 취소
export const cancelVote = async (
  questionId: number,
  optionId: number | undefined,
) => {
  const { data } = await auth.delete(
    `/api/v1/questions/${questionId}/options/${optionId}`,
  );
  return data;
};

// 댓글 생성
export const addComment = async ({ questionId, content }: ICommentReq) => {
  const { data } = await auth.post(`/api/v1/questions/${questionId}/comments`, {
    content,
  });
  return data;
};

// 댓글 조회
export const getComment = async ({ questionId, page }: ICommentGetReq) => {
  const { data } = await auth.get(
    `/api/v1/questions/${questionId}/comments?page=${page}&size=10`,
  );
  return data.data;
};

// 댓글 삭제
export const deleteComment = async ({
  questionId,
  commentId,
}: ICommentDelete) => {
  const { data } = await auth.delete(
    `/api/v1/questions/${questionId}/comments/${commentId}`,
  );
  return data;
};

// 댓글 수정
export const editComment = async ({
  questionId,
  commentId,
  content,
}: ICommentEdit) => {
  const { data } = await auth.put(
    `/api/v1/questions/${questionId}/comments/${commentId}`,
    content,
  );
  return data;
};

// 북마크 등록 및 해제
export const bookmarked = async (questionId: number) => {
  const { data } = await auth.post(`/api/v1/questions/${questionId}/bookmark`);
  return data;
};
