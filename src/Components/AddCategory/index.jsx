import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.css";

const AddCategory = ({ modalState }) => {

  const apiUrlCategories = "https://localhost:7229/api/Categories"  
  const [newCategory, setNewCategory] = useState({
    name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
    console.log(newCategory);
  };

  const requestPostCategory = async (e) => {
    e.preventDefault()
    modalState();
    try {
      const response = await axios.post(apiUrlCategories, newCategory);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          type="text"
          className="w-full border border-gray-400 p-2 rounded-md"
          required
        />
      </div>
      <div className="">
        <button
          onClick={requestPostCategory}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
        >Submit Category</button>
      </div>
    </form>
  );
};

export default AddCategory;

AddCategory.propTypes = {
  modalState: PropTypes.func.isRequired,
};


