import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <img 
          className="popup__image" 
          src={props.card ? props.card.link : ''}
          alt={props.card ? props.card.name : ''} 
        />
        <p className="popup__caption">{props.card ? props.card.name : ''}</p>
        <button type="button" aria-label="Закрыть" className="popup__close-btn popup__close-btn_type_image" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;