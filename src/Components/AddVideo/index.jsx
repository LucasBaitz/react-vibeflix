import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.css";

const AddVideo = ({ apiUrl, modalState, updateRequest }) => {

  const apiUrlCategories = "https://localhost:7229/api/Categories"  
  const [categories, setCategories] = useState([]);
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    description: "",
    categoryId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({
      ...newVideo,
      [name]: value,
    });
    console.log(newVideo);
  };

  const requestPost = async (e) => {
    e.preventDefault();
    modalState();
    await axios.post(apiUrl, newVideo).then(console.log(newVideo));
    updateRequest();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(apiUrlCategories);
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
  
    fetchCategories();
  }, [apiUrlCategories]);

  return (
    <form>
      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          onChange={handleChange}
          type="text"
          className="w-full border border-gray-400 p-2 rounded-md"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
          Video URL
        </label>
        <input
          id="url"
          name="url"
          onChange={handleChange}
          type="text"
          className="w-full border border-gray-400 p-2 rounded-md"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
          Video Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          className="w-full border border-gray-400 p-2 rounded-md resize-none"
          rows="3"
        ></textarea>
      <div className="mb-6">
        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
          Video Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          onChange={handleChange}
          className="w-full border border-gray-400 p-2 rounded-md"
          rows="3"
          required
        >
          <option disabled>Please select a category</option>
          {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)} 
        </select>
      </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          onClick={requestPost}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Video
        </button>
      </div>
    </form>
  );
};

export default AddVideo;

AddVideo.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  updateRequest: PropTypes.func.isRequired,
  modalState: PropTypes.func.isRequired,
};


