import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  }

  return (
    <PopupWithForm
      name = "confirm"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      title = "Вы уверены?"
      buttonText = "Да"
      onSubmit = {handleSubmit}
    />
  )
}

export default ConfirmDeletePopup;