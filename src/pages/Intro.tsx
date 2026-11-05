import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconKakao } from '@/assets/icon_kakao.svg';
import { ReactComponent as ImgCharGroup } from '@/assets/img_charGroup.svg';
import useTempMockData from '@/hooks/useTempMockData';

const Intro = () => {
  const navigate = useNavigate();
  const { loginPath } = useTempMockData();

  // 서버 운영 종료로 카카오 인가 대신 목 인가코드로 로그인 흐름을 진행한다
  // (기존: window.location.assign(KAKAO_AUTH_URL))
  const handleOAuthLogin = () => {
    navigate(loginPath);
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-between">
      <div className="absolute top-1/2 flex translate-y-[-55%]  flex-col items-center ">
        <p className="flex flex-col gap-1 text-black score-intro">
          <span>
            <span className="font-semibold text-prime1">취</span>준생 고민
          </span>
          <span>
            <span className="font-semibold text-prime1">해</span>결 서비스
          </span>
        </p>
        <div>
          <ImgCharGroup />
        </div>
      </div>
      {/* 하단 30px 의 목데이터 안내 문구와 겹치지 않도록 위로 올린다 */}
      <div className="absolute bottom-[70px]">
        <p className="mb-2 text-center text-GS3 score-medium14">
          함께 고민을 해결하러 갈까요?
        </p>
        <button
          type="button"
          className="btn h-[50px] w-[343px] rounded-[15px] border-0 bg-[#FEE500] px-[58px] py-3 text-[#191919] score-medium16 hover:bg-amber-200"
          onClick={handleOAuthLogin}
        >
          <IconKakao />
          카카오로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Intro;
