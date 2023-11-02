import { useFormContext } from 'react-hook-form';

import { CATEGORYOPTIONS } from '@/constants/question';

const FieldsCategory = () => {
  const { register } = useFormContext();
  return (
    <>
      <input type="checkbox" id="category-modal" className="modal-toggle" />
      <div className="modal">
        <div className="absolute bottom-0 flex w-[375px] flex-col rounded-t-xl bg-white px-4 pb-[31px] pt-10">
          <p className="mb-[23px] score-bold18">
            게시글의 카테고리를 선택해주세요.
          </p>
          {CATEGORYOPTIONS.map((tab) => (
            <label
              key={tab.title}
              htmlFor={tab.title}
              className="py-2 score-medium16"
            >
              <input
                type="radio"
                id={tab.title}
                value={tab.type}
                className="mr-3"
                {...register('type', {
                  required: true,
                })}
              />
              {tab.title}
            </label>
          ))}
          <div className="modal-action">
            <label
              htmlFor="category-modal"
              className="btn m-0 h-[42px] w-[95px] rounded-[10px] bg-prime1 py-[9px] text-center text-white score-medium14 hover:bg-prime1"
            >
              확인
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldsCategory;
