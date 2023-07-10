import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const onCloseEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    
    window.addEventListener('keydown', onCloseEscape);
    return () => {
      window.removeEventListener('keydown', onCloseEscape);
    };
  }, [onClose]);
  
  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
};
  return (
    <div className="overlay" onClick={onBackdropClick}>
      <div className="modal">
        <img src={image} alt={image.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
