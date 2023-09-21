type TVoteFilterBtn = {
  isSolved: boolean;
  setIsSolved: (arg: boolean) => void;
};

const VoteFilterBtn = ({ isSolved, setIsSolved }: TVoteFilterBtn) => {
  return (
    <div className="px-4 pt-4">
      <div className="mb-3 flex w-40 gap-2">
        <button
          type="button"
          className={`w-full rounded-[37px] py-2 ${
            isSolved
              ? 'border-[1px] border-GS6 text-GS4'
              : ' bg-prime1 text-white'
          }`}
          onClick={() => setIsSolved(false)}
        >
          해결중
        </button>
        <button
          type="button"
          className={`w-full rounded-[37px] py-2 ${
            isSolved
              ? ' bg-prime1 text-white'
              : 'border-[1px] border-GS6 text-GS4'
          }`}
          onClick={() => setIsSolved(true)}
        >
          해결완료
        </button>
      </div>
    </div>
  );
};

export default VoteFilterBtn;
