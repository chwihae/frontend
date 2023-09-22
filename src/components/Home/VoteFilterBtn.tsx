import { RADIOOPTIONS } from '@/constants/home';
type TVoteFilterBtn = {
  solvedIndex: number;
  setSolvedIndex: (arg: number) => void;
};

const VoteFilterBtn = ({ solvedIndex, setSolvedIndex }: TVoteFilterBtn) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolvedIndex(Number(event.target.value));
  };

  return (
    <div className="mb-6 flex w-full gap-2">
      {RADIOOPTIONS.map((option) => (
        <label
          key={option.value}
          className={`rounded-[37px] px-3 py-[6px] ${
            solvedIndex === option.value
              ? ' bg-prime1 text-white'
              : 'border-[1px] border-GS6 text-GS4'
          }`}
        >
          <input
            type="radio"
            name="voteFilter"
            value={option.value}
            checked={solvedIndex === option.value}
            onChange={handleRadioChange}
            className="hidden"
          />
          {option.text}
        </label>
      ))}
    </div>
  );
};

export default VoteFilterBtn;
