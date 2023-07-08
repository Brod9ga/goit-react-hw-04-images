import React from 'react';

const ImageGalleryItem = ({image, onClick}) => {
 
  return (<li className="galleryItem">
    <img src={image.webformatURL} alt={image.tags} className="galleryItem-image" onClick={() => onClick(image.largeImageURL)}/>
  </li>);
};

export default ImageGalleryItem;