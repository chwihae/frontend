import { useFieldArray, useFormContext } from 'react-hook-form';

import { ReactComponent as IConAdd } from '@/assets/icon_add_darkgray_filled.svg';
import { ReactComponent as IConMinus } from '@/assets/icon_minus_gray_filled.svg';

const FieldsOptionArray = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  return (
    <fieldset className="px-4 py-10">
      <div className="mb-6 flex">
        <legend className="scorebold16 text-GS1">투표 항목 입력</legend>
      </div>
      <ul className="mb-3 flex flex-col gap-3">
        {fields.map((item, index) => (
          <li key={item.id} className="relative flex">
            <input
              type="text"
              placeholder="항목 입력(20자 이내)"
              className="notosansmedium14 h-11 w-full rounded-[10px] border-[1px] border-GS6 px-5 py-[11px] outline-none placeholder:text-GS4 focus:border-prime1"
              {...register(`options.${index}.name`, {
                required: true,
                maxLength: 20,
              })}
            />
            {index >= 2 && (
              <button
                type="button"
                className="absolute right-4 top-1/2 translate-y-[-50%]"
                onClick={() => remove(index)}
              >
                <IConMinus />
              </button>
            )}
          </li>
        ))}
      </ul>
      {fields.length < 10 && (
        <button
          type="button"
          className="text-gs2 notosansmedium14 flex h-10 w-full items-center justify-center gap-1 rounded-[10px] bg-GS6 px-5 py-[11px] leading-none text-GS2"
          onClick={() => {
            append({ name: '' });
          }}
        >
          <IConAdd />
          항목 추가
        </button>
      )}
    </fieldset>
  );
};

export default FieldsOptionArray;
