import { useFieldArray, useFormContext } from 'react-hook-form';

const FieldsOptionArray = () => {
  const context = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: context.control,
    name: 'options',
  });

  return (
    <fieldset className="mb-10">
      <legend className="scoretitle1 text-GS1">투표 항목 입력</legend>
      <ul className="mb-3 flex flex-col gap-3">
        {fields.map((item, index) => {
          return (
            <li key={item.id} className="relative flex">
              <input
                type="text"
                placeholder="선택지 입력(20자 이내)"
                className="h-10 w-full rounded-[10px] border-[1px] border-GS6 px-5 py-[11px]"
                {...context.register(`options.${index}.name`)}
              />
              {index >= 2 ? (
                <button
                  type="button"
                  className="absolute right-4 top-1/2 translate-y-[-50%]"
                  onClick={() => remove(index)}
                >
                  제거
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
      {fields.length < 10 && (
        <button
          type="button"
          className="text-gs2 h-10 w-full rounded-[10px] bg-GS6 px-5 py-[11px]"
          onClick={() => {
            append({ name: '' });
          }}
        >
          항목추가
        </button>
      )}
    </fieldset>
  );
};

export default FieldsOptionArray;
