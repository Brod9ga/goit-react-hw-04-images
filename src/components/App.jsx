import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
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

export default class App extends Component {
  state = {
    images: [],
    word: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
  };

  onSubmit = (e) => {
    const wordTrim = e.trim();
    if (wordTrim === '') {
      return toast.error(
        'You did not specify data for the search, please try again!',
        toastConfig
      );
    }
    this.setState({ word: wordTrim, images: [], page: 1 }, this.fetchImages)
    
    this.setState({ word: e }, () => {
      console.log(this.state.word);
      this.fetchData();
    });
  };

onClick = (e) => {
  this.fetchData()
}

  fetchData = async () => {


    try {
      this.setState({ isLoading: true })
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.word}&page=${this.state.page}&key=36610432-c2e311e7e488000960139023f&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({
        images: [...this.state.images,...response.data.hits],
        page: this.state.page + 1,
      });
     
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }finally {
      this.setState({ isLoading: false });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })}
  };
  onModalClick = (image) => {
    console.log(image)
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      selectedImage: image,
    }));
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.images} onClick={this.onModalClick}/>
        {this.state.images.length > 0 && <Button onClick={this.onClick}>Load More</Button>}
        {this.state.isLoading && <Loader/>}
        {this.state.showModal && (
          <Modal image={this.state.selectedImage} onClose={this.onModalClick} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }
}
