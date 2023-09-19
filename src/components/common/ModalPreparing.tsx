const ModalPreparing = ({ name }: { name: string }) => {
  return (
    <>
      <input type="checkbox" id={name} className="modal-toggle" />
      <div className="modal">
        <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-8">
          <h4 className="font-bold">해당 기능은 준비중이예요.</h4>
          <p className="">열심히 개발하겠습니다! 😀</p>
          <div className="modal-action">
            <label htmlFor={name} className="btn">
              알겠어요
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPreparing;
