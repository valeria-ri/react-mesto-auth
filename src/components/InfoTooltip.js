import React from 'react';

function InfoTooltip({name, isOpen, imgPath, title, onClose}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <img 
          className="popup__tooltip-img" 
          src={imgPath} 
          alt={title}
        />
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <button 
          type="button" 
          aria-label="Закрыть" 
          className={`popup__close-btn popup__close-btn_type_${name}`} 
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip;