/* eslint-disable react/prop-types */
import Modal from "react-modal";

const ConfirmationPopUp = ({ modalIsOpen, setModelIsOpen, deleteProject }) => {
  const closeModal = () => setModelIsOpen(false);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      className="relative ConfirmationPopUp w-42 flex flex-col justify-center items-center p-10 gap-10"
      overlayClassName="Overlay"
    >
      <div className=" font-bold text-lg">本当に確かですか？</div>
      <div className="flex gap-10">
        <button
          className="bg-rose-700 text-white p-5 py-2"
          onClick={deleteProject}
        >
          確認する
        </button>
        <button
          className="bg-gray-400 text-black p-5 py-2"
          onClick={closeModal}
        >
          キャンセル
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationPopUp;
