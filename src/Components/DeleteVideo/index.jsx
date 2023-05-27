import './style.css'
import PropTypes from 'prop-types';

const DeleteVideo = ({videoTitle, changeModalState, onDelete }) => {

    const handleModalState = () => {
        changeModalState()
    }

    const confirmDelete = () => {
        handleModalState();
        onDelete();
    }

    return (
        <div>
            <p>Are you sure you want to delete the video: <br /><span className='font-bold'>{videoTitle}</span>?</p>
            <div className='flex justify-center pt-5'>
                <button className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={confirmDelete}>Delete</button>
            </div>
        </div>
    )
}

DeleteVideo.propTypes = {
    videoTitle: PropTypes.string.isRequired,
    changeModalState: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteVideo;