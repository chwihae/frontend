import { useState } from 'react';

import { ReactComponent as IconArrowBottomGray } from '@/assets/icon_arrow_bottom_gray.svg';
import { LEVELSTEP } from '@/constants/home';

const Mylevel = () => {
  const [accordionStates, setAccordionStates] = useState(
    new Array(LEVELSTEP.length).fill(false),
  );

  const toggleAccordion = (index: number) => {
    setAccordionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="pt-10">
      <section className="mb-10 flex flex-col items-center gap-6 px-4">
        <div className="flex flex-col items-center">
          <div className="mb-3 h-[100px] w-[100px] rounded-full border-[1px] border-GS6"></div>
          <h2 className="scorebold16">별랑이 1</h2>
        </div>
        <ul className="scoremedium14 h-[70px] w-full rounded-[10px] border-[1px] border-GS6 p-[11px] text-GS4">
          <div className="flex h-full translate-x-[-14px] items-center justify-center">
            <li className="flex flex-col items-center gap-1 border-r-[1px] border-[#cecece] pr-5">
              <span>투표 활동</span>
              <span className="text-prime1">121</span>
            </li>
            <li className="flex flex-col items-center gap-1 pl-5">
              <span>댓글</span>
              <span className="text-prime1">20</span>
            </li>
          </div>
        </ul>
      </section>
      <section>
        <h3 className="scorebold16 px-4 pb-6">별랑이 성장기</h3>
        <ul className="scoremedium14 flex flex-col">
          {LEVELSTEP.map((level, index) => (
            <li key={level.name} className="p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-2 ">
                  <span className="block h-10 w-10 rounded-full border-[1px] border-GS6"></span>
                  <span>{level.name} 별랑이</span>
                </div>
                <IconArrowBottomGray
                  className={`transform ${
                    accordionStates[index] ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {accordionStates[index] && (
                <div className="ml-[47px] pb-4 pt-2 text-GS3">
                  {
                    <>
                      <h4>💡등급 조건</h4>
                      <ul className="scoreregular14 pl-9">
                        <li className="list-disc">투표 수 0 이상</li>
                        <li className="list-disc">댓글 수 0 이상</li>
                      </ul>
                    </>
                  }
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Mylevel;
