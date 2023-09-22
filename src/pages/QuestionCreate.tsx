import { FormProvider, useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form';

import {
  CATEGORYOPTIONS,
  PERIODOPTIONS,
  PLACEHOLDER_CONTENT,
} from '@/constants/question';
import type { IQuestion } from '@/types/questionType';
import FieldsOptionArray from '@components/Question/FieldsOptionArray';

type TMethods = IQuestion & UseFormProps;

const QuestionCreate = () => {
  const defaultValues = {
    type: null,
    title: '',
    content: '',
    options: [{ name: '' }, { name: '' }],
    closeAt: null,
  };
  const methods = useForm<TMethods>({ defaultValues });

  const { register, handleSubmit } = methods;

  const onSubmit = (data: IQuestion) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {CATEGORYOPTIONS.map((tab) => (
          <label key={tab}>
            <input type="radio" value={tab} {...register('type')} />
            {tab}
          </label>
        ))}
        <input
          type="text"
          className="h-[52px] w-full py-[13px] pl-4 focus:outline-none"
          placeholder="제목을 입력해주세요.(15자 이내)"
          {...register('title')}
        />
        <textarea
          className="h-36 w-full resize-none px-4 py-6 focus:outline-none"
          placeholder={PLACEHOLDER_CONTENT}
          {...register('content')}
        />
        <FieldsOptionArray />
        <div>
          <div className="flex gap-1">
            <h2>고민 기간 설정</h2>
            <span>아이콘</span>
          </div>
          {PERIODOPTIONS.map((period) => (
            <label key={period}>
              <input type="radio" value={period} {...register('closeAt')} />
              {period}
            </label>
          ))}
        </div>
        <button type="submit" className="btn">
          작성완료
        </button>
      </form>
    </FormProvider>
  );
};

export default QuestionCreate;
