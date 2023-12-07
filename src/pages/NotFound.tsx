import { Link } from 'react-router-dom';

import { ReactComponent as IConLevelOne } from '@/assets/char_level1.svg';

const NotFound = () => (
  <div
    id="error-page"
    className="hide-scroll flex h-screen max-h-[926px] w-[375px] max-w-[428px] items-center justify-center bg-white shadow-lg"
  >
    <div className="flex flex-col items-center">
      <h1 className="mb-1 text-prime1 score-bold24">ERROR</h1>
      <span className="mb-5 text-prime1 score-bold20">404</span>
      <p className="mb-4 text-GS3 score-medium16">잘못된 경로입니다</p>
      <IConLevelOne className="mb-10 h-40 w-40" />
    </div>
    <Link
      className="absolute bottom-16 rounded-xl bg-prime1 px-20 py-3 text-white score-bold16"
      to="/home"
    >
      홈으로 돌아가기
    </Link>
  </div>
);

export default NotFound;
