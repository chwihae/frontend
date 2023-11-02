import { TABBAR } from '@/constants/home';

type TTabBar = {
  tabIndex: number;
  setTabIndex: (index: number) => void;
  setSolvedIndex: (arg: number) => void;
};

const TabBar = ({ tabIndex, setTabIndex, setSolvedIndex }: TTabBar) => {
  const handleTabBtn = (index: number) => {
    setTabIndex(index);
    setSolvedIndex(0);
  };

  return (
    <div className="flex items-center justify-between">
      <ol className="mb-3 flex h-[34px] w-full ">
        {TABBAR.map((tab, index) => (
          <li key={tab.type}>
            <button
              type="button"
              className={`scoremedium16 px-[6.4px] pb-[7px] text-center ${
                index === tabIndex
                  ? 'border-b-[3px] border-b-prime1 text-GS1 '
                  : 'border-b-[1px] border-b-GS6 text-GS4'
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
