import axios from 'axios';
import './style.css'
import PropTypes from "prop-types";
import { useState } from "react";


const EditVideo = ({ selectedTitle, selectedUrl, selectedDesc, selectedId }) => {

    const apiUrl = "https://localhost:7229/api/Videos"

    const [newVideoData, setnewVideoData] = useState({
        id: selectedId,
        title: selectedTitle,
        url: selectedUrl,
        description: selectedDesc,
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setnewVideoData({
            ...newVideoData,[name]:value
        });
    }

    const requestPatch = async(e) => {
        e.preventDefault();
        console.log(newVideoData)
        await axios.put(`${apiUrl}/${Number(selectedId)}`, newVideoData).then(console.log(newVideoData))
      }
    
    return (
        <form>
      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <textarea
          id="title"
          name="title"
          onChange={handleChange}
          type="text"
          className="w-full border border-gray-400 p-2 rounded-md"
          defaultValue={selectedTitle}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
          Video URL
        </label>
        <textarea
          id="url"
          name="url"
          onChange={handleChange}
          type="text"
          className="w-full border border-gray-400 p-2 rounded-md"
          defaultValue={selectedUrl}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Video description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          className="w-full border border-gray-400 p-2 rounded-md"
          rows="3"
          defaultValue={selectedDesc}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          onClick={requestPatch}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Save Changes
        </button>
      </div>
    </form>
    )
}

EditVideo.propTypes = {
    selectedId: PropTypes.number.isRequired,
    selectedUrl: PropTypes.string.isRequired,
    selectedTitle: PropTypes.string.isRequired,
    selectedDesc: PropTypes.string.isRequired,
};


export default EditVideo;