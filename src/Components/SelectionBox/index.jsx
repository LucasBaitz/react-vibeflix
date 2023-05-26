import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.css";

const SelectionBox = ( { videosSelection, givenStyle } ) => {

  const apiUrl = "https://localhost:7229/api/Categories"  
  const [categories, setCategories] = useState([]);
  const defaultStyle = givenStyle;

  const handleSelectionChange = (e) => {
    videosSelection(e.target.value)
    console.log(e.target.key)
  }

  const getCategories = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    }

    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await axios.get(apiUrl);
          const data = response.data;
          setCategories(data);
        } catch (error) {
          console.error('Error getting categories:', error);
        }
      };
  
      getCategories();
    }, []);

  return (
      <select onChange={handleSelectionChange} onClick={getCategories} className={`block w-full ${defaultStyle}`}>
        <option>All</option>
        {categories.map((category) => (
          <option key={category.id} >{category.name}</option>
        ))}
      </select>
  );
};

export default SelectionBox;

SelectionBox.propTypes = {
  videosSelection: PropTypes.func.isRequired,
  givenStyle: PropTypes.string,
};