import { ReactComponent as IConWarning } from '@/assets/icon_warning.svg';

const ModalPreparing = ({ name }: { name: string }) => {
  return (
    <>
      <input type="checkbox" id={name} className="modal-toggle" />
      <div className="modal">
        <div className="flex h-[250px] w-[250px] flex-col items-center gap-3 rounded-[20px] bg-white py-[27px]">
          <IConWarning />
          <h4 className="scorebold16">해당 기능은 준비중이에요</h4>
          <p className="notosansregular14 text-center">
            열심히 개발중이니
            <br />
            조금만 더 기다려 주세요!
          </p>
          <div className="modal-action mt-3">
            <label
              htmlFor={name}
              className="scoremedium14 btn m-0 h-[42px] w-[95px] rounded-[10px] bg-prime1 py-[9px] text-center text-white hover:bg-prime1"
            >
              알겠어요
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPreparing;
