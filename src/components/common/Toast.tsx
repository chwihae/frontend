import { useEffect } from 'react';

type TToast = {
  text: string;
  setToast: (arg: boolean) => void;
};

const Toast = ({ text, setToast }: TToast) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`text-bold absolute bottom-32 left-1/2 z-50 w-[343px] translate-x-[-50%] rounded-md bg-GS2 px-12 py-2 text-center text-sm text-white`}
    >
      {text}
    </div>
  );
};

export default Toast;
