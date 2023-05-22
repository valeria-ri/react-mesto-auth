import React from 'react';

function PopupWithForm({name, isOpen, title, onSubmit, children, buttonText, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form 
          className={`popup__form popup__form_type_${name}`} 
          name={name} 
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className={`popup__submit-btn popup__submit-btn_type_${name}`}>{buttonText}</button>
        </form>
        <button type="button" aria-label="Закрыть" className={`popup__close-btn popup__close-btn_type_${name}`} onClick={onClose} />
      </div>
    </div>
  )
}

export default PopupWithForm;