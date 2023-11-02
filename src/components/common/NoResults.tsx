import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmark_gray.svg';
import { ReactComponent as IConEditGray } from '@/assets/icon_edit_gray.svg';
import { ReactComponent as IConVoteGray } from '@/assets/icon_vote_gray.svg';

const NoResults = () => {
  const { pathname } = useLocation();

  const MYNoResultText = [
    {
      href: '/mypage/written',
      text: '작성한',
      content: `글을 작성하면\n여기에서 모아볼 수 있어요!`,
      icon: <IConEditGray className="h-[120px] w-[120px]" />,
      btnTitle: '글 작성하기',
      btnHref: '/question',
    },
    {
      href: '/mypage/participated',
      text: '투표한',
      content: `투표페이지에서\n질문에 투표하면\n여기에서 모아볼 수 있어요!`,
      icon: <IConVoteGray className="h-[120px] w-[120px]" />,
      btnTitle: '글 보러가기',
      btnHref: '/home',
    },
    {
      href: '/mypage/saved',
      text: '저장된',
      content: `투표페이지에서\n북마크 버튼을 누르시면\n더욱 편리하게 이용하실 수 있어요!`,
      icon: <IConBookmarkGray className="h-[120px] w-[120px]" />,
      btnTitle: '글 보러가기',
      btnHref: '/home',
    },
  ];

  const text = MYNoResultText.find((items) => items.href === pathname);

  return (
    <div className="mt-16 text-center ">
      {pathname === '/home' ? (
        <div className="text-GS4 score-medium12">
          글이 없어요!
          <br />
          별랑이의 고민을 올려주세요.
          <br />
          다른 별랑이들이 결정을 도와줄 거예요.
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <div>{text?.icon}</div>
          <div className="score-bold16">{text?.text} 글이 텅 비었어요!</div>
          <div className="whitespace-pre-wrap text-GS4 score-medium12">
            {text?.content}
          </div>
          <Link
            to={text?.btnHref as string}
            className="mt-5 rounded-xl bg-prime1 px-10 py-[10px] text-white score-medium16"
          >
            {text?.btnTitle}
          </Link>
        </div>
      )}
    </div>
  );
};

export default NoResults;
