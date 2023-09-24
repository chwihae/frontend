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

type TMethods = IQuestion & UseFormProps;

const QuestionCreate = () => {
  const navigate = useNavigate();
  const [isCategoryModal, setIsCategoryModal] = useState(false);
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
  const watchFields = watch(['title', 'type', 'options', 'closeAt']);
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

  useEffect(() => {
    const findName = CATEGORYOPTIONS.find((tab) => tab.type === watchFields[1]);
    setCategoryName(findName?.title || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFields[1]]);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label
            htmlFor="category-modal"
            className="scoremedium16 flex h-12  cursor-pointer items-center justify-between px-4"
            onClick={() => setIsCategoryModal(true)}
          >
            <span>
              {watchFields[1] ? categoryName : '카테고리를 선택해주세요'}
            </span>
            <IConForwardBlack />
          </label>
        </fieldset>
        <fieldset>
          <input
            type="text"
            className="notosansmedium16 h-[52px] w-full border-[1px] border-bg px-4 py-[13px] focus:outline-none "
            placeholder="제목을 입력해주세요 (30자 이내)"
            minLength={1}
            maxLength={15}
            {...register('title', {
              required: true,
              minLength: 1,
              maxLength: 30,
            })}
          />
        </fieldset>
        <fieldset>
          <textarea
            className="notosansregular14 hide-scroll h-[259px] w-full resize-none border-b-[10px] border-bg px-4 py-6 placeholder:whitespace-pre-line placeholder:text-GS4 focus:outline-none"
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
              <label key={period} className="scoreregular16 flex items-center">
                <input
                  type="radio"
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
          <Toast setToast={setFailedToast} text="글 등록에 실패하였습니다" />
        )}
      </form>
      {isCategoryModal && <FieldsCategory />}
    </FormProvider>
  );
};

export default QuestionCreate;
