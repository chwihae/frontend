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
      {radioOptions.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="voteFilter"
            value={option.value}
            checked={solvedIndex === option.value}
            onChange={handleRadioChange}
          />
          {option.text}
        </label>
      ))}
    </div>
  );
};

export default VoteFilterBtn;

const radioOptions = [
  { text: '전체', value: 0 },
  { text: '해결중', value: 1 },
  { text: '해결완료', value: 2 },
];
