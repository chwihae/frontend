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
    <div className="px-4 pt-4">
      {RADIOOPTIONS.map((option) => (
        <label
          key={option.value}
          className={`w-full rounded-[37px] py-2 ${
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
