import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getVoteOption, getVoteSingle } from '@/apis/question';
import { addComment, addVote, deleteVote, getComment } from '@/apis/vote';
import { ReactComponent as IConClockBlack } from '@/assets/icon_clock_black.svg';
import { ReactComponent as IConKebabGray } from '@/assets/icon_kebab.gray.svg';
import { ReactComponent as IConSendGray } from '@/assets/icon_send_gray.svg';
import { ReactComponent as IConSendOrange } from '@/assets/icon_send_orange.svg';
import useTimer from '@/hooks/useTimer';
import type {
  ICommentRes,
  IVoteOptionsRes,
  IVoteSingleRes,
} from '@/types/voteType';
import ModalPreparing from '@components/common/ModalPreparing';
import Statistics from '@components/common/Statistics';

const Vote = () => {
  const [isModal, setIsModal] = useState(false);

  // 투표글 아이디
  const params = useParams();
  const postId = Number(params.id);

  // 투표글 데이터
  const [pollPost, setPollPost] = useState<IVoteSingleRes>();
  const [pollOptions, setPollOptions] = useState<IVoteOptionsRes>();

  const fetchVoteSingle = async () => {
    const res = await getVoteSingle(postId);
    setPollPost(res?.data);
  };

  const fetchVoteOptions = async () => {
    const res = await getVoteOption(postId);
    setPollOptions(res?.data);
  };

  useEffect(() => {
    fetchVoteSingle();
    fetchVoteOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // 타이머
  const future = pollPost?.closeAt || '';
  const timer = useTimer(future);

  //옵션선택
  const handleChooseOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionId = Number(e.target.value);
    // console.log(optionId);

    const postData = async (optid: number) => {
      console.log(postId, optid);
      if (pollOptions) {
        const res = await addVote(postId, optid);
        if (res.code !== 201) {
          fetchVoteOptions();
        }
      }
    };
    postData(optionId);
  };

  //재투표
  const handleRevoteBtn = () => {
    pollOptions && deleteVote(postId, pollOptions.votedOptionId);
  };

  //댓글
  const [inputComment, setInputComment] = useState('');
  const [commentList, setCommentList] = useState<ICommentRes[]>([]);

  const handleInputCommentChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(postId, inputComment);
  };

  useEffect(() => {
    const fetchCommentGet = async (id: number) => {
      const res = await getComment(id);
      if (res.code === 200) {
        setCommentList(res?.data.content);
      }
    };
    fetchCommentGet(postId);
  }, [postId]);

  // console.log(commentList);

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
          {commentList.map((comment) => (
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
