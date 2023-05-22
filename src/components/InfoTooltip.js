import React from 'react';

function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <img 
          className="popup__tooltip-img" 
          src={props.imgPath} 
          alt={props.title}
        />
        <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
        <button 
          type="button" 
          aria-label="Закрыть" 
          className={`popup__close-btn popup__close-btn_type_${props.name}`} 
          onClick={props.onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip;