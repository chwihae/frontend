import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { addComment, addVote, deleteVote, getComment } from '@/apis/vote';
import { ReactComponent as IConClockBlack } from '@/assets/icon_clock_black.svg';
import { ReactComponent as IConKebabGray } from '@/assets/icon_kebab.gray.svg';
import { ReactComponent as IConSendGray } from '@/assets/icon_send_gray.svg';
import { ReactComponent as IConSendOrange } from '@/assets/icon_send_orange.svg';
import useTimer from '@/hooks/useTimer';
import useVoteQuery from '@/hooks/useVotequery';
import type { ICommentRes } from '@/types/voteType';
import ModalPreparing from '@components/common/ModalPreparing';
import Statistics from '@components/common/Statistics';

const Vote = () => {
  const queryClient = useQueryClient();
  const [isModal, setIsModal] = useState(false);

  // 투표글 아이디
  const params = useParams();
  const postId = Number(params.id);

  const { pollPost, pollOptions } = useVoteQuery(postId);
  const [optionId, setOptionId] = useState<number>(0);

  const { mutate: chooseOptMutation } = useMutation({
    mutationFn: () => addVote(postId, optionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['voteSingle', postId]);
      queryClient.invalidateQueries(['voteOptions', postId]);
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: () => deleteVote(postId, pollOptions?.votedOptionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['voteSingle', postId]);
      queryClient.invalidateQueries(['voteOptions', postId]);
    },
  });

  // 타이머
  const future = pollPost?.closeAt || '';
  const timer = useTimer(future);

  //옵션선택
  const handleChooseOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    setOptionId(id);
    chooseOptMutation();
  };

  //재투표
  const handleRevoteBtn = () => {
    deleteMutation();
  };

  //댓글
  const [inputComment, setInputComment] = useState('');
  const { data: commentList } = useQuery<ICommentRes[]>({
    queryKey: ['comments', postId],
    queryFn: () => getComment(postId),
  });

  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    },
  });

  const handleInputCommentChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentMutate({ questionId: postId, comment: inputComment });
    setInputComment('');
  };

  return (
    <div>
      {/* 본문 */}
      <section className="scorebold16 mt-10 border-b-[10px] border-b-bg px-4 pb-6">
        {/* 글 내용 */}
        <div className="mb-[49px]">
          <div className="scoremedium14 mb-6 w-fit rounded-[37px] border-[1px] border-GS6 px-3 py-[6px] text-GS4">
            {pollPost?.status === 'IN_PROGRESS' ? '해결중' : '해결완료'}
          </div>
          <h2 className="notosansbold16 mb-3">{pollPost?.title}</h2>
          <p className="notosansregular16">{pollPost?.content}</p>
        </div>
        {/* 투표항목 */}
        <div>
          <div className="scoremedium12 mb-3 flex items-center justify-between text-GS3 ">
            <div className="flex items-center gap-1">
              <IConClockBlack />
              <span className="scoremedium12">{timer} 남음</span>
            </div>
            {pollOptions?.showVoteCount && (
              <button
                type="button"
                className="scoremedium12"
                onClick={handleRevoteBtn}
              >
                다시 투표 하기
              </button>
            )}
          </div>
          {/* 투표항목 */}
          <ul className="relative mb-2 flex flex-col gap-3">
            {pollOptions?.options
              .sort((a, b) => a.id - b.id)
              .map((option) => (
                <label
                  key={option.id}
                  className={`notosansregular14 flex h-14 w-[343px] items-center rounded-[10px]   ${
                    pollOptions?.showVoteCount === false
                      ? 'border-[1px] border-GS6 px-4'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`${postId}-option`}
                    value={option.id}
                    className="hidden"
                    disabled={pollOptions?.showVoteCount === true}
                    onChange={handleChooseOption}
                  />
                  <span className="absolute left-4">{option.name}</span>
                  {pollOptions?.showVoteCount && (
                    <>
                      <progress
                        max={pollPost?.voteCount}
                        value={option?.voteCount}
                        className="resultsProgress h-14 w-[343px]"
                      ></progress>
                      <span className="notosansmedium14 absolute right-4">
                        {pollPost &&
                          Math.round(
                            (option?.voteCount / pollPost?.voteCount) * 100,
                          )}
                        %
                      </span>
                    </>
                  )}
                </label>
              ))}
          </ul>
          {pollOptions?.showVoteCount && (
            <div className="scoreregular12 mb-[46px] text-right text-GS4 ">
              투표수 {pollPost?.voteCount}
            </div>
          )}
          {/* 통계치 */}
          {pollPost && (
            <Statistics
              viewCount={pollPost?.viewCount}
              commentCount={pollPost?.commentCount}
              bookmarkCount={pollPost?.bookmarkCount}
            />
          )}
        </div>
      </section>
      {/* 댓글 */}
      <section className="px-4 pb-[49px] pt-10">
        <h3 className="mb-6">댓글</h3>
        {/* 댓글목록 */}
        <ol className="grid gap-3">
          {commentList
            ?.sort((a, b) => a.id - b.id)
            .map((comment) => (
              <li key={comment?.id}>
                <div className="notosansmedium16 mb-3 flex items-center justify-between">
                  <span>{comment?.commenterAlias}</span>
                  <label
                    htmlFor="temp-modal"
                    className="cursor-pointer"
                    onClick={() => setIsModal(true)}
                  >
                    <IConKebabGray />
                  </label>
                </div>
                <p className="notosansregular16 mb-1 text-GS2">
                  {comment?.content}
                </p>
                <span className="notosansregular12 text-GS4">
                  {comment?.createdAt.replaceAll('-', '.').replace('T', '. ')}
                </span>
              </li>
            ))}
        </ol>
        <form
          onSubmit={handleCommentSubmit}
          className="mt-9 flex h-11 items-center gap-[5px]"
        >
          <input
            type="text"
            maxLength={500}
            value={inputComment}
            placeholder="댓글을 입력해주세요"
            onChange={handleInputCommentChange}
            className="notosansmedium14 w-full rounded-[10px] bg-bg px-5 py-[11px] placeholder:text-GS4 focus:outline-none"
          />
          <button type="submit" className="p-[10px]">
            {inputComment === '' ? <IConSendGray /> : <IConSendOrange />}
          </button>
        </form>
      </section>
      {isModal && <ModalPreparing name="temp-modal" />}
    </div>
  );
};

export default Vote;
