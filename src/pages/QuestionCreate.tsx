import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { UseFormProps } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { addQuestion } from '@/apis/question';
import { ReactComponent as IConForwardBlack } from '@/assets/icon_forward_black.svg';
import { ReactComponent as IConInfo } from '@/assets/icon_info_gray_filled.svg';
import {
  CATEGORYOPTIONS,
  PERIODOPTIONS,
  PLACEHOLDER_CONTENT,
} from '@/constants/question';
import type { IQuestion } from '@/types/questionType';
import Toast from '@components/common/Toast';
import FieldsCategory from '@components/Question/FieldsCategory';
import FieldsOptionArray from '@components/Question/FieldsOptionArray';
import TooltipPeriod from '@components/Question/TooltipPeriod';

type TMethods = IQuestion & UseFormProps;

const QuestionCreate = () => {
  const navigate = useNavigate();

  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [writeToast, setWriteToast] = useState(false);
  const [failedToast, setFailedToast] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const defaultValues = {
    type: '',
    title: '',
    content: '',
    options: [{ name: '' }, { name: '' }],
    closeAt: '3일',
  };
  const methods = useForm<TMethods>({ defaultValues });
  const { register, watch, handleSubmit } = methods;
  const watchFields = watch(['title', 'type', 'options']);
  const IsOptionArrayEmptied = watchFields[2].some((item) => item.name === '');

  useEffect(() => {
    const findName = CATEGORYOPTIONS.find((tab) => tab.type === watchFields[1]);
    setCategoryName(findName?.title || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFields[1]]);

  const handleSubmitBtn = () => {
    if (IsOptionArrayEmptied) setWriteToast(true);
  };
  const onSubmit = async (data: IQuestion) => {
    const res = await addQuestion(data);
    if (res?.code === 201) {
      navigate('/home', {
        state: { toastMessage: '고민이 등록되었어요' },
      });
    } else {
      setFailedToast(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label
            htmlFor="category-modal"
            className="flex h-12 cursor-pointer items-center justify-between px-4 score-medium16"
            onClick={() => setIsCategoryModal(true)}
          >
            <p>{watchFields[1] ? categoryName : '카테고리를 선택해주세요'}</p>
            <IConForwardBlack />
          </label>
        </fieldset>
        <fieldset>
          <input
            type="text"
            className="h-[52px] w-full border-[1px] border-bg px-4 py-[13px] notosans-medium16 focus:outline-none "
            placeholder="제목을 입력해주세요 (20자 이내)"
            minLength={1}
            maxLength={20}
            {...register('title', {
              required: true,
              minLength: 1,
              maxLength: 30,
            })}
          />
        </fieldset>
        <fieldset>
          <textarea
            className="hide-scroll h-[259px] w-full resize-none border-b-[10px] border-bg px-4 py-6 notosans-regular14 placeholder:whitespace-pre-line placeholder:text-GS4 focus:outline-none"
            placeholder={PLACEHOLDER_CONTENT}
            maxLength={800}
            {...register('content')}
          />
        </fieldset>
        <FieldsOptionArray />
        <fieldset className="mb-10 px-4">
          <div className="mb-6 flex items-center gap-1">
            <legend className="score-bold16">고민 기간 설정</legend>
            <button
              type="button"
              className="relative cursor-pointer"
              onClick={() => setIsTooltipOpen((prev) => !prev)}
            >
              <IConInfo />
              {isTooltipOpen && <TooltipPeriod />}
            </button>
          </div>
          <ol className="mb-16 flex gap-10">
            {PERIODOPTIONS.map((period) => (
              <label
                key={period}
                htmlFor={period}
                className="flex items-center score-regular16"
              >
                <input
                  type="radio"
                  id={period}
                  value={period}
                  className="mr-2"
                  {...register('closeAt', {
                    required: true,
                  })}
                />
                {period}
              </label>
            ))}
          </ol>
        </fieldset>
        <button
          type="submit"
          className={`mx-4 mb-10 h-14 rounded-2xl px-10 py-3 score-medium20  ${
            watchFields[0] && watchFields[1]
              ? 'bg-prime1 text-white'
              : 'bg-GS6 text-white'
          }`}
          disabled={!watchFields[0] || !watchFields[1]}
          onClick={handleSubmitBtn}
        >
          등록하기
        </button>
        {isCategoryModal && <FieldsCategory />}
        {writeToast && (
          <Toast setToast={setWriteToast} text="투표 선택지를 입력해야해요" />
        )}
        {failedToast && (
          <Toast setToast={setFailedToast} text="글 등록에 실패하였습니다" />
        )}
      </form>
    </FormProvider>
  );
};

export default QuestionCreate;
