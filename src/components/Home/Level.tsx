import useUserInfo from '@/hooks/useUserInfo';
import LevelImage from '@components/common/LevelImage';

const Level = () => {
  const user = useUserInfo();

  return (
    <section className="mt-[34px] flex h-1/3 flex-col items-center justify-center gap-4">
      <LevelImage className="h-24 w-24" />
      <p className="text-xl">나는 {user?.level} 별랑이!</p>
      <div className="flex w-full justify-center gap-2">
        <span className="bg-orange-400">아이콘</span>
        <div className="h-6 w-4/6 bg-orange-400">투표 프로그레스바</div>
      </div>
      <div className="flex w-full justify-center gap-2">
        <span className="bg-orange-400">아이콘</span>
        <div className="h-6 w-4/6 bg-orange-400">댓글 프로그레스바</div>
      </div>
    </section>
  );
};

export default Level;
