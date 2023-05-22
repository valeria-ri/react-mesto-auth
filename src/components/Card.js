import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <div className="card">
      <img 
        className="card__image" 
        src={card.link} 
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && 
        <button 
          type="button" 
          aria-label="Удалить" 
          className="card__delete"
          onClick={handleDeleteClick}
        />
      } 
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button 
            type="button" 
            aria-label="Нравится" 
            className={cardLikeButtonClassName} 
            onClick={handleLikeClick} 
          />
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;