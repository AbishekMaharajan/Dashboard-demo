/* eslint-disable react/prop-types */
import Modal from "react-modal";
import ReactPlayer from "react-player";
import { AiOutlineCloseCircle } from "react-icons/ai";

const VideoPlayerModal = ({ videoUrl, modalIsOpen, setModalIsOpen }) => {
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      contentLabel="Example Modal"
      className="relative p-10 VideoPlayerModal"
      overlayClassName="Overlay"
    >
      <button
        onClick={closeModal}
        className="absolute cursor-pointer right-3 top-3"
      >
        <AiOutlineCloseCircle fontSize={"1.5rem"} color="#333" />
      </button>
      <ReactPlayer
        controls
        className="react-player"
        url={videoUrl ? videoUrl : ""}
        width="100%"
      />
    </Modal>
  );
};

export default VideoPlayerModal;
