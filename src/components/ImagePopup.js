import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <img 
          className="popup__image" 
          src={card ? card.link : ''}
          alt={card ? card.name : ''} 
        />
        <p className="popup__caption">{card ? card.name : ''}</p>
        <button type="button" aria-label="Закрыть" className="popup__close-btn popup__close-btn_type_image" onClick={onClose} />
      </div>
    </div>
  )
}

export default ImagePopup;