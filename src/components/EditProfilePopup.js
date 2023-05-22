import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name = "edit"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      title = "Редактировать профиль"
      buttonText = "Сохранить"
      onSubmit = {handleSubmit}
    >
      <label htmlFor="name" className="popup__form-field">
        <input 
          type="text" 
          name="name" 
          placeholder="Имя" 
          id="username-input" 
          className="popup__input popup__input_type_name" 
          value={name || ''}
          required 
          minLength="2" 
          maxLength="40" 
          onChange={handleNameChange}
        />
        <span className="popup__input-error username-input-error"></span>
      </label>
      <label htmlFor="about" className="popup__form-field">
        <input 
          type="text" 
          name="about" 
          placeholder="О себе" 
          id="about" 
          className="popup__input popup__input_type_about" 
          value={description || ''}
          required 
          minLength="2" 
          maxLength="200" 
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error about-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;