import React, { useState } from 'react';
import {Searchbar} from './Searchbar/Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [word, setWord] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = (e) => {
    const wordTrim = e.trim();
    if (wordTrim === '') {
      return toast.error(
        'You did not specify data for the search, please try again!',
        toastConfig
      );
    }

    setWord(wordTrim);
    setImages([]);
    setPage(1);
    fetchData(wordTrim, 1);
    
  };

  const onClick = () => {
    fetchData(word, page);
  };

  const fetchData = async (word, page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${word}&page=${page}&key=36610432-c2e311e7e488000960139023f&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    } finally {
      setIsLoading(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const onModalClick = (image) => {
    setShowModal((prevState) => !prevState);
    setSelectedImage(image);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onClick={onModalClick} />
      {images.length > 0 && <Button onClick={onClick}>Load More</Button>}
      {isLoading && <Loader />}
      {showModal && <Modal image={selectedImage} onClose={onModalClick} />}
      <ToastContainer {...toastConfig} />
    </div>
  );
};
