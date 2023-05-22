import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form 
          className={`popup__form popup__form_type_${props.name}`} 
          name={props.name} 
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button type="submit" className={`popup__submit-btn popup__submit-btn_type_${props.name}`}>{props.buttonText}</button>
        </form>
        <button type="button" aria-label="Закрыть" className={`popup__close-btn popup__close-btn_type_${props.name}`} onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;