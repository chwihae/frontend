import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { addQuestion } from '@/apis/question';
import { ReactComponent as IConInfo } from '@/assets/icon_info_gray_filled.svg';
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

  const [writeToast, setWriteToast] = useState(false);
  const [failedToast, setFailedToast] = useState(false);

  const handleSubmitBtn = () => {
    if (IsOptionArrayEmptied) setWriteToast(true);
  };

  const onSubmit = (data: IQuestion) => {
    const fatchData = async () => {
      const res = await addQuestion(data);
      if (res?.code === 201) {
        navigate('/home', { state: { id: res?.id, toast: true } });
      } else {
        setFailedToast(true);
      }
    };
    fatchData();
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
            className="notosansmedium16 h-[52px] w-full border-[1px] border-bg px-4 py-[13px] focus:outline-none "
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
            className="notosansregular14 hide-scroll h-[259px] w-full resize-none border-b-[10px] border-bg px-4 py-6 placeholder:text-GS4 focus:outline-none"
            placeholder={PLACEHOLDER_CONTENT}
            maxLength={800}
            {...register('content')}
          />
        </fieldset>
        <FieldsOptionArray />
        <fieldset className="mb-10 px-4">
          <div className="mb-6 flex items-center gap-1">
            <legend className="scorebold16">고민 기간 설정</legend>
            <IConInfo />
          </div>
          <ol className="mb-16 flex gap-10">
            {PERIODOPTIONS.map((period) => (
              <label
                key={period.value}
                className="scoreregular16 flex items-center"
              >
                <input
                  type="radio"
                  value={period.value}
                  className="mr-2"
                  {...register('closeAt', {
                    required: true,
                  })}
                />
                {period.text}
              </label>
            ))}
          </ol>
        </fieldset>
        <button
          type="submit"
          className={`scoremedium20 mx-4 mb-10 h-14 rounded-2xl px-10 py-3  ${
            watchFields[0] && watchFields[1]
              ? 'bg-prime1 text-white'
              : 'bg-GS6 text-white'
          }`}
          disabled={!watchFields[0] || !watchFields[1]}
          onClick={handleSubmitBtn}
        >
          등록하기
        </button>
        {writeToast && (
          <Toast setToast={setWriteToast} text="투표 선택지를 입력해야해요" />
        )}
        {failedToast && (
          <Toast setToast={setFailedToast} text="글 등록에 실패하였습니다." />
        )}
      </form>
    </FormProvider>
  );
};

export default QuestionCreate;
