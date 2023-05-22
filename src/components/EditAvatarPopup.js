import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name = "avatar"
      isOpen = {isOpen}
      onClose = {onClose}
      title = "Обновить аватар"
      buttonText = "Сохранить"
      onSubmit = {handleSubmit}
    >
      <label htmlFor="avatar" className="popup__form-field">
        <input 
          type="url" 
          name="avatar" 
          placeholder="Ссылка на картинку" 
          id="avatar" 
          className="popup__input popup__input_type_avatar" 
          ref={avatarRef}
          required 
        />
        <span className="popup__input-error avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;