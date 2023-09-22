import {
  CATEGORYOPTIONS,
  PERIODOPTIONS,
  PLACEHOLDER_CONTENT,
} from '@/constants/question';

const QuestionCreate = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {CATEGORYOPTIONS.map((tab) => (
          <label key={tab}>
            <input type="radio" value={tab} />
            {tab}
          </label>
        ))}
        <input
          type="text"
          className="h-[52px] w-full py-[13px] pl-4 focus:outline-none"
          placeholder="제목을 입력해주세요.(15자 이내)"
        />
        <textarea
          className="h-36 w-full resize-none px-4 py-6 focus:outline-none"
          placeholder={PLACEHOLDER_CONTENT}
        />
        {PERIODOPTIONS.map((period) => (
          <label key={period}>
            <input type="radio" value={period} />
            {period}
          </label>
        ))}
        <button type="submit" className="btn">
          작성완료
        </button>
      </form>
    </div>
  );
};

export default QuestionCreate;
