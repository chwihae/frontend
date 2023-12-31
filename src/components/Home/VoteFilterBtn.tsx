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
    <div className="mb-6 flex w-full items-center gap-2 px-4 py-3 score-medium14">
      {RADIOOPTIONS.map((option) => (
        <label
          key={option.value}
          htmlFor={option.text}
          className={`rounded-[37px] px-3 py-[6px] ${
            solvedIndex === option.value
              ? ' bg-prime1 text-white'
              : 'border-[1px] border-GS6 text-GS4'
          }`}
        >
          <input
            type="radio"
            name="voteFilter"
            id={option.text}
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
