import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onAddPlace, onClose}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return(
    <PopupWithForm
      name = "add"
      isOpen = {isOpen}
      onClose = {onClose}
      title = "Новое место"
      buttonText = "Сохранить"
      onSubmit = {handleSubmit}
    >
      <label htmlFor="name" className="popup__form-field">
        <input 
          type="text" 
          name="name" 
          placeholder="Название" 
          id="name" className="popup__input popup__input_type_card-name" 
          required 
          minLength="2" 
          maxLength="30" 
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__input-error name-error"></span>
      </label>
      <label htmlFor="link" className="popup__form-field">
        <input 
          type="url" 
          name="link" 
          placeholder="Ссылка на картинку" 
          id="link" 
          className="popup__input popup__input_type_card-link" 
          required 
          value={link || ''}
          onChange={handleLinkChange}
        />
        <span className="popup__input-error link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;