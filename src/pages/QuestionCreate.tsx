import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { addQuestion } from '@/apis/question';
import {
  CATEGORYOPTIONS,
  PERIODOPTIONS,
  PLACEHOLDER_CONTENT,
} from '@/constants/question';
import type { IQuestion } from '@/types/questionType';
import Toast from '@components/common/Toast';
import FieldsOptionArray from '@components/Question/FieldsOptionArray';

type TMethods = IQuestion & UseFormProps;

const QuestionCreate = () => {
  const navigate = useNavigate();

  const defaultValues = {
    type: null,
    title: '',
    content: '',
    options: [{ name: '' }, { name: '' }],
    closeAt: '1800000',
  };
  const methods = useForm<TMethods>({ defaultValues });
  const { register, watch, handleSubmit } = methods;
  const watchFields = watch(['title', 'type', 'options']);
  const IsOptionArrayEmptied = watchFields[2].some((item) => item.name === '');

  const [showToast, setShowToast] = useState(false);

  const handleSubmitBtn = () => {
    if (IsOptionArrayEmptied) setShowToast(true);
  };

  const onSubmit = (data: IQuestion) => {
    const fatchData = async () => {
      const res = await addQuestion(data);
      console.log(res);
      navigate('/home', { state: res?.id });
    };
    fatchData();
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          {CATEGORYOPTIONS.map((tab) => (
            <label key={tab.title}>
              <input
                type="radio"
                value={tab.type}
                {...register('type', {
                  required: true,
                })}
              />
              {tab.title}
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
        <button
          type="submit"
          className={`scoremedium h-14 rounded-2xl px-10 py-3  ${
            watchFields[0] && watchFields[1]
              ? 'bg-prime1 text-white'
              : 'bg-GS6 text-white'
          }`}
          disabled={!watchFields[0] || !watchFields[1]}
          onClick={handleSubmitBtn}
        >
          등록하기
        </button>
        {showToast && (
          <Toast
            setShowToast={setShowToast}
            text="투표 선택지를 입력해주세요"
          />
        )}
      </form>
    </FormProvider>
  );
};

export default QuestionCreate;
