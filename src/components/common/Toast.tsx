import { useEffect } from 'react';

type TToast = {
  text: string;
  setShowToast: (arg: boolean) => void;
};

const Toast = ({ text, setShowToast }: TToast) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`text-bold absolute bottom-8 left-1/2 w-max translate-x-[-50%] rounded-md bg-GS2 px-12 py-2 text-center text-sm text-white`}
    >
      {text}
    </div>
  );
};

export default Toast;
