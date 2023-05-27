import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'
import Header from './Components/Header'
import VideoDisplay from './Components/VideoDisplay'
import Modal from './Components/Modal';
import AddVideo from './Components/AddVideo';
import AddCategory from './Components/AddCategory';

function App() {
  const apiUrl = "https://localhost:7229/api/Videos";

  const [apiData, setApiData] = useState ([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const getVideosByCategory = async (category) => {
    const categoriesUrl = `https://localhost:7229/api/Categories/Name?name=${category}`
    category === "All" ? requestGet() : 
    await axios.get(categoriesUrl)
      .then(response => {
        setApiData(response.data.videos)
      }).catch(error => console.log(error))
  }

  const handleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  }

  const handleAddCategoryModal = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
  }
  
  const requestGet = async () => {
    await axios.get(apiUrl)
     .then(response => {
      setApiData(response.data);
     }).catch(error => console.log(error))
  }

  const requestDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      console.log(`${id} deleted`);
    } catch (error) {
      console.error("Error on this task:", error);
    }
    requestGet();
  };
  
  useEffect(() => {
    requestGet();
  }, [])

  return (
    <>
      <Header onOpenModal={handleAddModal} onOpenCategoryModal={handleAddCategoryModal} setVideosSelection={getVideosByCategory} />
      <Modal modalTitle='Add a new video!' isOpen={isAddModalOpen} onClose={handleAddModal} >
        <AddVideo apiUrl={apiUrl} modalState={handleAddModal} updateRequest={requestGet} />
      </Modal>
      <Modal modalTitle='Add a new category!' isOpen={isAddCategoryModalOpen} onClose={handleAddCategoryModal} >
        <AddCategory modalState={handleAddCategoryModal} />
      </Modal>
      <div>
        {
        apiData.length >= 1 ? <h1 className='text-center text-5xl text-white font-semibold p-10'>My videos</h1> :
                              <h1 className='text-center text-5xl text-white font-semibold p-10'>No videos avaliable</h1> 
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-5 pt-10 min-w-lg'>
            {apiData.map(video => <VideoDisplay key={video.id} title={video.title} videoUrl={video.url} description={video.description} onDelete={requestDelete} deleteId={video.id} newRequest={requestGet} />)}
        </div>
      </div>
    </>
  )
}

export default App;
