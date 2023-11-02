import { TOOLTIP_PERIOD } from '@/constants/question';

const TooltipPeriod = () => (
  <div className="absolute left-[-91px] top-[-90px] flex w-[200px] flex-col items-center justify-center whitespace-pre-wrap rounded-[10px] bg-prime1 px-4 py-[10px] text-left text-white notosans-medium12 ">
    {TOOLTIP_PERIOD}
    <div className="absolute bottom-[-26px] h-0 w-0 border-b-[18px] border-l-[10px] border-r-[10px] border-t-[18px] border-b-transparent border-l-transparent border-r-transparent border-t-prime1" />
  </div>
);

export default TooltipPeriod;
