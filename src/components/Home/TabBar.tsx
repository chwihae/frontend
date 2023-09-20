import { TABBAR } from '@/constants/home';

type TTabBar = {
  tabIndex: number;
  setTabIndex: (index: number) => void;
};

const TabBar = ({ tabIndex, setTabIndex }: TTabBar) => {
  const handleTabBtn = (index: number) => {
    setTabIndex(index);
  };

  console.log(tabIndex);

  return (
    <div className="mt-10 flex items-center justify-between">
      <ol className="flex h-[35px] justify-center border-b-[1px] border-b-GS6">
        {TABBAR.map((tab, index) => (
          <li key={tab.type}>
            <button
              className={`scorebody1 tracking-wide-[0.16px] border-b-[3px] px-[14.671px] pb-3 text-center ${
                index === tabIndex
                  ? 'border-b-emerald-600 font-bold'
                  : 'border-b-transparent'
              }`}
              onClick={() => handleTabBtn(index)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TabBar;
