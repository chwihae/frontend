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
    closeAt: '1800000',
  };
  const methods = useForm<TMethods>({ defaultValues });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IQuestion) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          {CATEGORYOPTIONS.map((tab) => (
            <label key={tab}>
              <input
                type="radio"
                value={tab}
                {...register('type', {
                  required: true,
                })}
              />
              {tab}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <input
            type="text"
            className="h-[52px] w-full py-[13px] pl-4 focus:outline-none"
            placeholder="제목을 입력해주세요.(15자 이내)"
            minLength={1}
            maxLength={15}
            {...register('title', {
              required: true,
              minLength: 1,
              maxLength: 15,
            })}
          />
        </fieldset>
        <fieldset>
          <textarea
            className="h-36 w-full resize-none px-4 py-6 focus:outline-none"
            placeholder={PLACEHOLDER_CONTENT}
            maxLength={800}
            {...register('content')}
          />
        </fieldset>
        <FieldsOptionArray />
        <fieldset>
          <div className="flex gap-1">
            <legend>고민 기간 설정</legend>
            <span>아이콘</span>
          </div>
          {PERIODOPTIONS.map((period) => (
            <label key={period.value}>
              <input
                type="radio"
                value={period.value}
                {...register('closeAt', {
                  required: true,
                })}
              />
              {period.text}
            </label>
          ))}
        </fieldset>
        <button type="submit" className="btn">
          작성완료
        </button>
      </form>
    </FormProvider>
  );
};

export default QuestionCreate;
