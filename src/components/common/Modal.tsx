const Modal = ({
  name,
  title,
  text,
}: {
  name: string;
  title: string;
  text: string;
}) => (
  <>
    <input type="checkbox" id={name} className="modal-toggle" />
    <div className="modal">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-8">
        <h4 className="font-bold">{title}</h4>
        <p className="">{text}</p>
        <div className="modal-action">
          <label htmlFor={name} className="btn">
            알겠어요
          </label>
        </div>
      </div>
    </div>
  </>
);

export default Modal;
