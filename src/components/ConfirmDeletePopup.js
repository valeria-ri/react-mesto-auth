import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({onCardDelete, isOpen, onClose}) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      name = "confirm"
      isOpen = {isOpen}
      onClose = {onClose}
      title = "Вы уверены?"
      buttonText = "Да"
      onSubmit = {handleSubmit}
    />
  )
}

export default ConfirmDeletePopup;