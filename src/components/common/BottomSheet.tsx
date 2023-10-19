interface IBottomSheest {
  isInProgress: boolean;
  listArray: string[];
}

const BottomSheet = ({ isInProgress, listArray }: IBottomSheest) => {
  return (
    <>
      <input type="checkbox" id="bottomSheet-modal" className="modal-toggle" />
      <div className="modal">
        <div className="absolute bottom-0 flex w-[375px] flex-col rounded-t-xl bg-white px-4 pb-[18px] pt-5">
          <ul className="scoremedium16 text-GS1">
            {listArray.map((list) =>
              !isInProgress && list === '글 수정' ? null : (
                <li key={list} className="py-2">
                  <button type="button">{list}</button>
                </li>
              ),
            )}
            <li className="modal-action mt-0 justify-normal py-2 text-GS4">
              <label htmlFor="bottomSheet-modal" className="cursor-pointer">
                취소
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
