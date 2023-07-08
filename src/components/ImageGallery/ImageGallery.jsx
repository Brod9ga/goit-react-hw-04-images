import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className="gallary">
      {images.map((image) => {
        return <ImageGalleryItem key={image.id} image={image} className="gallery-item" onClick={onClick} />;
      })}
    </ul>
  );
};

export default ImageGallery;
