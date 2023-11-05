import { ReactComponent as IconKakao } from '@/assets/icon_kakao.svg';
import { ReactComponent as ImgCharGroup } from '@/assets/img_charGroup.svg';
import { KAKAO_AUTH_URL } from '@/constants/kakao';

const Intro = () => {
  const handleOAuthLogin = () => {
    window.location.assign(KAKAO_AUTH_URL);
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-between">
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
      <div className="absolute bottom-10">
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
