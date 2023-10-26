import { createContext, useContext, useState } from 'react';

export interface IContextType {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContext: IContextType = {
  isBottomSheetOpen: false,
  setIsBottomSheetOpen: () => {},
};

const IsBottomSheetContext = createContext(initialContext);

const IsBottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  return (
    <IsBottomSheetContext.Provider
      value={{ isBottomSheetOpen, setIsBottomSheetOpen }}
    >
      {children}
    </IsBottomSheetContext.Provider>
  );
};

const useIsBottomSheetContext = () => {
  const { isBottomSheetOpen, setIsBottomSheetOpen } =
    useContext(IsBottomSheetContext);
  return { isBottomSheetOpen, setIsBottomSheetOpen };
};

// eslint-disable-next-line react-refresh/only-export-components
export { IsBottomSheetProvider, useIsBottomSheetContext };
