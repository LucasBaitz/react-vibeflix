import './style.css';
import { RiVideoAddFill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import PropTypes from 'prop-types';
import SelectionBox from '../SelectionBox';


const Header = ({ onOpenModal, onOpenCategoryModal, setVideosSelection }) => {

  const addVideoModalHandler = () => {
    onOpenModal();
  }

  const addCategoryModalHandler = () => {
    onOpenCategoryModal();
  }

  return (
    <header className="bg-violet-900 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center border-purple-900 py-3 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <a value="Home" href="/">
              <h1 className="text-2xl font-thin text-white">VibeFlix</h1>
            </a>
          </div>
          <div className='w-full md:w-auto mx-4 flex justify-center'>
            <SelectionBox videosSelection={setVideosSelection} givenStyle={"bg-violet-700 text-gray-100 border border-transparent rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"} />
          </div>
          <nav className="w-full md:w-auto flex flex-wrap items-center justify-center md:justify-end space-x-4">
            <button value="AddVideo" onClick={addVideoModalHandler} className="text-base font-medium text-white hover:text-purple-300">
              <RiVideoAddFill size={30} />
            </button>
            <button value="AddCategory" onClick={addCategoryModalHandler} className="text-base font-medium text-white hover:text-purple-300">
              <BiCategory size={30}  />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onOpenModal: PropTypes.func,
  onOpenCategoryModal: PropTypes.func,
  setVideosSelection: PropTypes.func.isRequired
};


export default Header;
