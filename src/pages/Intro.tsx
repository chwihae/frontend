import { KAKAO_AUTH_URL } from '@/constants/kakao';

const Intro = () => {
  const handleOAuthLogin = () => {
    window.location.assign(KAKAO_AUTH_URL);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between py-28">
      <div>
        <div className="mb-5 flex h-[168px] w-[160px] items-center justify-center rounded-xl bg-amber-200">
          로고
        </div>
        <p className="font-bold">취해로 취준생 고민은 해결!</p>
      </div>
      <div>
        <p className="mb-5 text-center font-bold">
          함께 고민 해결하러 가볼까요?
        </p>
        <button
          className="btn h-[46px] w-[300px] rounded-xl border-0 bg-amber-200 text-lg hover:bg-amber-100"
          onClick={handleOAuthLogin}
        >
          카카오 계정으로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Intro;
