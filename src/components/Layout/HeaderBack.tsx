import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as IConBackBlack } from '@/assets/icon_back_black.svg';
import { ReactComponent as IConCloseBlack } from '@/assets/icon_close_black.svg';
import { ReactComponent as IConKebabBlack } from '@/assets/icon_kebab_black.svg';
import { ROUTER } from '@/constants/layout';
import { useIsBottomSheetContext } from '@/contexts/IsBottomSheetProvider';
import useGetPostId from '@/hooks/useGetPostId';
import useVoteQuery from '@/hooks/useVoteQuery';

const HeaderBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const findTitle = ROUTER.find((page) => pathname.includes(page.href));
  const isVotePage = findTitle?.href === 'vote';
  const isQuestionPage = findTitle?.href === 'question';
  const { setIsBottomSheetOpen } = useIsBottomSheetContext();

  const { postId } = useGetPostId();

  const { pollPost } = useVoteQuery(postId);

  const handleBackBtn = () => {
    if (
      isQuestionPage &&
      !window.confirm('글쓰기를 그만두시겠어요?\n작성중인 내용이 삭제됩니다.')
    ) {
      return;
    }
    if (isQuestionPage) {
      navigate('/home');
    } else {
      navigate(-1);
    }
  };

  const handleKebabBtn = () => {
    setIsBottomSheetOpen(true);
  };

  return (
    <div className="relative flex h-full items-center justify-between px-4">
      <button onClick={handleBackBtn}>
        {isQuestionPage ? <IConCloseBlack /> : <IConBackBlack />}
      </button>
      <h1 className="scorebold18 absolute left-1/2 translate-x-[-50%]">
        {findTitle?.title}
      </h1>
      {isVotePage && pollPost?.editable && (
        <label
          htmlFor="bottomSheet-voteEdit-modal"
          className="scoremedium16 flex h-12 cursor-pointer items-center justify-between"
          onClick={handleKebabBtn}
        >
          <IConKebabBlack />
        </label>
      )}
    </div>
  );
};

export default HeaderBack;
