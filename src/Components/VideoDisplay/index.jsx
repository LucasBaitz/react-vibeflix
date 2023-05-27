import "./style.css";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import Modal from "../Modal";
import { useState } from "react";
import DeleteVideo from "../DeleteVideo";
import EditVideo from "../EditVideo";

const VideoDisplay = ({ videoUrl, title, description, onDelete, deleteId, newRequest }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  }

  const originalUrl = videoUrl.match(/(?:v=)([\w-]+)/)[1];
  const regexUrl = `https://www.youtube.com/embed/${originalUrl}`;

  const deleteHandler = () => {
    console.log(deleteId);
    onDelete(deleteId);
  };

  

  return (
    <div className="relative rounded-lg overflow-hidden shadow-2xl bg-violet-600 bg-opacity-20">
      <iframe
        className="w-full h-72 object-cover"
        title={title}
        src={regexUrl}
        frameBorder="0"
        allowFullScreen
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-center text-white mb-2">{title}</div>
        <p className="text-gray-300 text-xl">{description}</p>
      </div>
      <button onClick={handleDeleteModal} className="absolute top-1 right-2 p-2 text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:bg-red-700">
        <AiFillDelete title="Delete" className="w-6 h-6" fill="white" />
      </button>
      <button onClick={handleEditModal} className="absolute top-12 right-2 p-2 text-white bg-cyan-500 rounded-full hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700">
        <BsPencil title="Edit" className="w-6 h-6" fill="white" />
      </button>
      <Modal modalTitle="WARNING!" isOpen={isDeleteModalOpen} onClose={handleDeleteModal}>
        <DeleteVideo
          videoTitle={title}
          changeModalState={handleDeleteModal}
          onDelete={deleteHandler}
          newRequest={newRequest}
        />
      </Modal>
      <Modal modalTitle="Editing!" isOpen={isEditModalOpen} onClose={handleEditModal} >
        <EditVideo
          changeModalState={handleEditModal}
          selectedUrl={videoUrl}
          selectedTitle={title}
          selectedDesc={description}
          selectedId={deleteId}
          newRequest={newRequest}
        />
      </Modal>
    </div>
  );
};

VideoDisplay.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleteId: PropTypes.number.isRequired,
  newRequest: PropTypes.func.isRequired,
};

export default VideoDisplay;
