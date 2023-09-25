import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as IConBookmarkGray } from '@/assets/icon_bookmark_gray.svg';

const NoResults = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  const text = MYNoResultText.find((items) => items.href === pathname);

  return (
    <>
      <div className="mt-16 text-center ">
        {pathname === '/home' ? (
          <div className="scoremedium12 text-GS4">
            글이 없어요!
            <br />
            별랑이의 고민을 올려주세요.
            <br />
            다른 별랑이들이 결정을 도와줄 거예요.
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <IConBookmarkGray className="h-[150px] w-[150px]" />
            <div className="scorebold16">{text?.text} 글이 텅 비었어요!</div>
            <div className="scoremedium12 mb-4 text-GS4">
              투표할 수 있는 페이지에서 <br /> 북마크 버튼을 누르시면 <br />{' '}
              더욱 편리하게 이용하실 수 있어요!
            </div>
            <Link
              to="/home"
              className={`scoremedium16 rounded-xl bg-prime1 px-10 py-[10px] text-white`}
            >
              글 보러가기
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NoResults;

const MYNoResultText = [
  { href: '/mypage/posted', text: '등록된' },
  { href: '/mypage/voted', text: '투표한' },
  { href: '/mypage/saved', text: '저장된' },
];
