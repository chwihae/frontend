const ConfirmModal = () => (
  <>
    <input type="checkbox" id="confirm-modal" className="modal-toggle" />
    <div className="modal">
      <div className="flex h-[250px] w-[250px] flex-col items-center gap-3 rounded-[20px] bg-white py-[27px]">
        <div>
          <img
            src="/src/assets/icon_pen.png"
            aria-hidden="true"
            alt=""
            className="mb-3 w-9"
          />
          <p className="scorebold16 mb-3 ml-0 text-center">글을 게시할까요?</p>
          <p className="notosansmedium14 mb-6 ml-0 flex flex-col items-center">
            <span>게시된 글의 [항목]은</span>
            <span>수정이 불가능해요</span>
          </p>
        </div>

        <div className="modal-action mt-0 flex flex-col items-center">
          {/* <div>
            <label
              htmlFor="confirm-modal"
              className="scoremedium14 btn m-0 mr-2 h-[42px] w-[95px] rounded-[10px] bg-GS6 py-[9px] text-center text-white hover:bg-GS6"
            >
              <input
                type="radio"
                value="취소"
                className="scoremedium14 btn m-0 h-[42px] w-[95px] rounded-[10px] bg-prime1 py-[9px] text-center text-white hover:bg-prime1"
              />
              취소
            </label>
            <label>
              <input
                type="radio"
                value="확인"
                className="scoremedium14 btn m-0 h-[42px] w-[95px] rounded-[10px] bg-prime1 py-[9px] text-center text-white hover:bg-prime1"
              />
              확인
            </label>
          </div> */}
        </div>
      </div>
    </div>
  </>
);

export default ConfirmModal;
